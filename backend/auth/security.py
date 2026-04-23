from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from jose import JWTError, jwt
from passlib.context import CryptContext

from utils.config import ADMIN_PASSWORD, ADMIN_USERNAME, JWT_SECRET


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash once at startup so env keeps plaintext, runtime compares securely.
ADMIN_PASSWORD_HASH = pwd_context.hash(ADMIN_PASSWORD)


def verify_admin_credentials(username: str, password: str) -> bool:
    if username != ADMIN_USERNAME:
        return False
    return pwd_context.verify(password, ADMIN_PASSWORD_HASH)


def create_access_token(subject: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc
