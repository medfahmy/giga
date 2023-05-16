use axum::{response::IntoResponse, Json};
use serde_json::json;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    LoginFail,
}

impl std::error::Error for Error {}

impl std::fmt::Display for Error {
    fn fmt(&self, fmt: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(fmt, "{:?}", self)
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        println!("->> {:<12} - {:?}", "INTO RESPONSE", self);
        match self {
            Error::LoginFail => (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "UNHANDLED_CLIENT_ERROR"})),
            )
                .into_response(),
        }
    }
}
