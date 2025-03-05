from neo4j import GraphDatabase
from .utils import (
    validate_age,
    validate_interests,
    execute_query,
    format_person_data,
    format_friendship_data,
)

class SocialNetwork:
    def __init__(self, uri, user, password):
        """
        Initialize the SocialNetwork class with Neo4j connection details.
        """
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        """
        Close the Neo4j driver connection.
        """
        self.driver.close()
    
    def get_all_locations(self):
        """
        Fetch all unique locations from the database.
        """
        query = """
        MATCH (p:Person)
        RETURN DISTINCT p.location AS location
        """
        result = execute_query(self.driver, query)
        return [record["location"] for record in result] if result else []

    def get_all_interests(self):
        """
        Fetch all unique interests from the database.
        """
        query = """
        MATCH (p:Person)
        UNWIND p.interests AS interest
        RETURN DISTINCT interest
        """
        result = execute_query(self.driver, query)
        return [record["interest"] for record in result] if result else []

    def add_person(self, name, age, location, interests=None):
        """
        Add a person to the social network.
        """
        try:
            # Validate inputs
            validate_age(age)
            if interests:
                validate_interests(interests)

            query = """
            CREATE (p:Person {name: $name, age: $age, location: $location})
            SET p.interests = $interests
            RETURN p
            """
            parameters = {"name": name, "age": age, "location": location, "interests": interests or []}
            result = execute_query(self.driver, query, parameters)
            return format_person_data(result[0]) if result else "Failed to add person."
        except Exception as e:
            return f"Error adding person: {e}"
        
    def get_all_people(self):
        """
        Fetch all people from the database.
        """
        query = """
        MATCH (p:Person)
        RETURN p.name AS name
        """
        result = execute_query(self.driver, query)
        return [record["name"] for record in result] if result else []

    def add_friendship(self, person1, person2):
        """
        Add a friendship between two people.
        """
        try:
            query = """
            MATCH (a:Person {name: $person1}), (b:Person {name: $person2})
            CREATE (a)-[:FRIENDS_WITH]->(b)
            RETURN a.name AS person1, b.name AS person2
            """
            parameters = {"person1": person1, "person2": person2}
            result = execute_query(self.driver, query, parameters)
            return format_friendship_data(result[0]) if result else "Failed to add friendship."
        except Exception as e:
            return f"Error adding friendship: {e}"

    def find_mutual_friends(self, person1, person2):
        """
        Find mutual friends between two people.
        """
        try:
            query = """
            MATCH (a:Person {name: $person1})-[:FRIENDS_WITH]->(mutual)<-[:FRIENDS_WITH]-(b:Person {name: $person2})
            RETURN mutual.name AS mutual_friend
            """
            parameters = {"person1": person1, "person2": person2}
            result = execute_query(self.driver, query, parameters)
            return [record["mutual_friend"] for record in result] if result else []
        except Exception as e:
            return f"Error finding mutual friends: {e}"

    def recommend_friends(self, person):
        """
        Recommend friends based on shared connections.
        """
        try:
            query = """
            MATCH (a:Person {name: $person})-[:FRIENDS_WITH]->(friend)-[:FRIENDS_WITH]->(recommended)
            WHERE NOT (a)-[:FRIENDS_WITH]->(recommended) AND a <> recommended
            RETURN recommended.name AS recommendation, COUNT(*) AS strength
            ORDER BY strength DESC
            """
            parameters = {"person": person}
            result = execute_query(self.driver, query, parameters)
            return [record["recommendation"] for record in result] if result else []
        except Exception as e:
            return f"Error recommending friends: {e}"

    def visualize_network(self):
        """
        Generate a visualization of the social network and return the HTML content.
        """
        try:
            query = """
            MATCH (a:Person)-[r:FRIENDS_WITH]->(b:Person)
            RETURN a.name AS person1, a.age AS age1, a.location AS location1,
                b.name AS person2, b.age AS age2, b.location AS location2
            """
            results = execute_query(self.driver, query)

            # Create a Pyvis network
            from pyvis.network import Network
            net = Network(height="500px", width="100%", notebook=True)
            for record in results:
                net.add_node(record["person1"], title=f"Age: {record['age1']}, Location: {record['location1']}", color="lightblue")
                net.add_node(record["person2"], title=f"Age: {record['age2']}, Location: {record['location2']}", color="lightgreen")
                net.add_edge(record["person1"], record["person2"])

            # Generate the HTML content
            html_content = net.generate_html()
            return html_content
        except Exception as e:
            return f"Error generating visualization: {e}"