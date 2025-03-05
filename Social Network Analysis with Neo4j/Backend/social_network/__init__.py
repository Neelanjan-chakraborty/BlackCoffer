# Import the SocialNetwork class and utility functions
from .social_network import SocialNetwork
from .utils import (
    validate_age,
    validate_interests,
    execute_query,
    format_person_data,
    format_friendship_data,
)

# Define what gets imported when someone uses `from social_network import *`
__all__ = [
    "SocialNetwork",
    "validate_age",
    "validate_interests",
    "execute_query",
    "format_person_data",
    "format_friendship_data",
]

# Optional: Add a package-level description
__version__ = "1.0.0"
__description__ = "A Python package for managing and analyzing social networks using Neo4j."