CREATE TABLE IF NOT EXISTS lecturers (
    uuid TEXT PRIMARY KEY NOT NULL,
    title_before TEXT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    title_after TEXT,
    picture_url TEXT,
    location TEXT,
    claim TEXT,
    bio TEXT,
);