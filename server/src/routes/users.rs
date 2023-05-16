use crate::Error;
use axum::routing::{get, post};
use axum::{response::IntoResponse, Extension, Json, Router};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;
use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};

pub fn create_router() -> axum::Router {
    Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .route("/me", get(me))
}

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
struct User {
    id: i32,
    email: String,
    phone: String,
    password_hash: String,
    role_id: i32,
    first_name: String,
    last_name: String,
    image_url: String,
    location: String,
    created_at: chrono::NaiveDateTime,
    updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct SignupPayload {
    username: String,
    password: String,
}

#[axum_macros::debug_handler]
async fn signup(
    Extension(pool): Extension<PgPool>,
    Json(signup): Json<SignupPayload>,
) -> impl IntoResponse {
    // let token = match encode(&Header, &signup, &EncodingKey::from_secret(key)) {
    //     Ok(t) => t,
    //     Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, "error while encoding token").into_response(),
    // };
    

    let password = b"hunter42"; // Bad password; don't actually use!
    let salt = SaltString::generate(&mut OsRng);

    // Argon2 with default params (Argon2id v19)
    let argon2 = Argon2::default();

    // Hash password to PHC string ($argon2id$v=19$...)
    let password_hash = argon2.hash_password(password, &salt).unwrap().to_string();


    Json(json!({ "username": signup.username, "password_hash": password_hash }))
}

#[derive(Debug, Deserialize, Serialize)]
struct LoginPayload {
    username: String,
    password: String,
}

async fn login(
    Extension(pool): Extension<PgPool>,
    Json(payload): Json<LoginPayload>,
) -> impl IntoResponse {
    if payload.username != "admin" || payload.password != "admin" {
        return Err(Error::LoginFail);
    }

    // query user from db
    // let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = $1");

    // Verify password against PHC string.
    //
    // NOTE: hash params from `parsed_hash` are used instead of what is configured in the
    // `Argon2` instance.
    let parsed_hash = PasswordHash::new(&password_hash).unwrap();
    assert!(Argon2::default().verify_password(payload.password, &parsed_hash).is_ok());

    Ok(Json(json!({"token": "Bearer token"})))
}

async fn me(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}

async fn refresh(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}
