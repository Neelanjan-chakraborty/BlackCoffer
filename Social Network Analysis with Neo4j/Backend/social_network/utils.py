from neo4j import GraphDatabase

def validate_age(age):
    """
    Validate that the age is a positive integer.
    """
    if not isinstance(age, int) or age <= 0:
        raise ValueError("Age must be a positive integer.")
    return True

def validate_interests(interests):
    """
    Validate that interests are provided as a list of strings.
    """
    if not isinstance(interests, list) or not all(isinstance(i, str) for i in interests):
        raise ValueError("Interests must be a list of strings.")
    return True

def execute_query(driver, query, parameters=None):
    """
    A reusable function to execute Neo4j queries.
    """
    try:
        with driver.session() as session:
            result = session.run(query, parameters)
            return result.data()
    except Exception as e:
        print(f"An error occurred while executing the query: {e}")
        return None

def format_person_data(person_data):
    """
    Format person data for display.
    """
    if not person_data:
        return "No data found."
    return "\n".join([f"{key}: {value}" for key, value in person_data.items()])

def format_friendship_data(friendship_data):
    """
    Format friendship data for display.
    """
    if not friendship_data:
        return "No data found."
    return f"{friendship_data['person1']} is friends with {friendship_data['person2']}"