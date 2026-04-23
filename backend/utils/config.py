from pathlib import Path
import os

from dotenv import load_dotenv


ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")


def get_required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


MONGO_URL = get_required_env("MONGO_URL")
DB_NAME = get_required_env("DB_NAME")
JWT_SECRET = get_required_env("JWT_SECRET")
ADMIN_USERNAME = get_required_env("ADMIN_USERNAME")
ADMIN_PASSWORD = get_required_env("ADMIN_PASSWORD")
CORS_ORIGINS = [origin.strip() for origin in get_required_env("CORS_ORIGINS").split(",") if origin.strip()]
