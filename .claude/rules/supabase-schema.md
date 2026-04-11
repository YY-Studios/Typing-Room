---

# Supabase 테이블 스키마

## keyboards

| 컬럼        | 타입        | 설명       |
| ----------- | ----------- | ---------- |
| id          | uuid PK     |            |
| slug        | text UNIQUE |            |
| name_ko     | text        |            |
| name_en     | text        |            |
| description | text        |            |
| is_free     | boolean     | 기본 false |
| sort_order  | smallint    | 기본 0     |
| created_at  | timestamptz |            |

## keyboard_sounds

| 컬럼        | 타입                   | 설명       |
| ----------- | ---------------------- | ---------- |
| id          | uuid PK                |            |
| keyboard_id | uuid FK → keyboards.id |            |
| key_type    | enum                   |            |
| file_url    | text                   |            |
| is_free     | boolean                | 기본 false |
| created_at  | timestamptz            |            |

## moods

| 컬럼        | 타입        | 설명   |
| ----------- | ----------- | ------ |
| id          | uuid PK     |        |
| slug        | text UNIQUE |        |
| name_ko     | text        |        |
| description | text        |        |
| color_hex   | text        |        |
| emoji       | text        |        |
| sort_order  | smallint    | 기본 0 |
| created_at  | timestamptz |        |

## sentences

| 컬럼       | 타입                   | 설명        |
| ---------- | ---------------------- | ----------- |
| id         | uuid PK                |             |
| mood_id    | uuid FK → moods.id     |             |
| content    | text                   |             |
| source     | enum (sentence_source) | 기본 'seed' |
| lang       | char                   | 기본 'ko'   |
| is_active  | boolean                | 기본 true   |
| created_at | timestamptz            |             |

## profiles

| 컬럼       | 타입                       | 설명 |
| ---------- | -------------------------- | ---- |
| id         | uuid PK FK → auth.users.id |      |
| nickname   | text                       |      |
| avatar_url | text                       |      |
| created_at | timestamptz                |      |
| updated_at | timestamptz                |      |

## typing_results

| 컬럼         | 타입                   | 설명 |
| ------------ | ---------------------- | ---- |
| id           | uuid PK                |      |
| user_id      | uuid FK → profiles.id  |      |
| keyboard_id  | uuid FK → keyboards.id |      |
| mood_id      | uuid FK → moods.id     |      |
| sentence_id  | uuid FK → sentences.id |      |
| duration_sec | smallint               |      |
| share_token  | text UNIQUE            |      |
| created_at   | timestamptz            |      |

## user_unlocks

| 컬럼        | 타입                  | 설명                    |
| ----------- | --------------------- | ----------------------- |
| id          | uuid PK               |                         |
| user_id     | uuid FK → profiles.id |                         |
| item_type   | enum                  |                         |
| item_id     | uuid                  | keyboards 또는 moods id |
| unlocked_at | timestamptz           |                         |
