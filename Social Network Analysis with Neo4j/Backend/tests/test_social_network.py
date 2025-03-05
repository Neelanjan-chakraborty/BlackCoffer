import unittest
from social_network.social_network import SocialNetwork

class TestSocialNetwork(unittest.TestCase):
    def setUp(self):
        self.sn = SocialNetwork("neo4j://localhost:7687", "neo4j", "your_password")

    def test_add_person(self):
        result = self.sn.add_person("TestPerson", 30, "TestCity")
        self.assertIsNotNone(result)

    def test_add_friendship(self):
        self.sn.add_person("Person1", 25, "City1")
        self.sn.add_person("Person2", 28, "City2")
        result = self.sn.add_friendship("Person1", "Person2")
        self.assertIsNotNone(result)

if __name__ == "__main__":
    unittest.main()