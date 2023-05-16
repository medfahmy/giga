use std::collections::HashMap;

pub struct Env {
    pub db_url: String,
}

pub fn load_env() -> Env {
    let dotenv = std::fs::read_to_string(".env").unwrap();
    let lines = dotenv.lines();
    let vars: HashMap<&str, &str> = lines.map(|line| line.split_once("=").unwrap()).collect();

    let db_url: String = vars.get("DATABASE_URL").unwrap().to_string();

    Env { db_url }
}
