from fastapi import APIRouter, Depends, HTTPException, status

from auth.dependencies import require_admin
from auth.security import create_access_token, verify_admin_credentials
from models.auth import AdminMeResponse, LoginRequest, TokenResponse


router = APIRouter(prefix="/api/admin", tags=["admin-auth"])


@router.post("/login", response_model=TokenResponse)
async def admin_login(payload: LoginRequest):
    if not verify_admin_credentials(payload.username, payload.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(payload.username)
    return TokenResponse(token=token)


@router.get("/me", response_model=AdminMeResponse)
async def admin_me(username: str = Depends(require_admin)):
    return AdminMeResponse(username=username)
