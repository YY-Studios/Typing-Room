---

# Supabase 테이블 스키마

## themes (구 keyboards)

| 컬럼         | 타입        | 설명               |
| ------------ | ----------- | ------------------ |
| id           | uuid PK     |                    |
| slug         | text UNIQUE |                    |
| name_ko      | text        |                    |
| name_en      | text        |                    |
| description  | text        |                    |
| is_free      | boolean     | 기본 false         |
| sort_order   | smallint    | 기본 0             |
| color_base   | text        | 키보드 베이스 색상 |
| color_keys   | text        | 알파벳 키캡 색상   |
| color_accent | text        | 특수키 키캡 색상   |
| created_at   | timestamptz |                    |

## theme_sounds (구 keyboard_sounds)

| 컬럼       | 타입                | 설명       |
| ---------- | ------------------- | ---------- |
| id         | uuid PK             |            |
| theme_id   | uuid FK → themes.id |            |
| key_type   | enum                |            |
| file_url   | text                |            |
| is_free    | boolean             | 기본 false |
| created_at | timestamptz         |            |

## theme_decos (신규)

| 컬럼       | 타입                | 설명                                  |
| ---------- | ------------------- | ------------------------------------- |
| id         | uuid PK             |                                       |
| theme_id   | uuid FK → themes.id |                                       |
| position   | text                | left, top, top-right, bottom-right 등 |
| image_url  | text                |                                       |
| sort_order | smallint            | 기본 0                                |
| created_at | timestamptz         |                                       |

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
| theme_id     | uuid FK → themes.id    |      |
| mood_id      | uuid FK → moods.id     |      |
| sentence_id  | uuid FK → sentences.id |      |
| duration_sec | smallint               |      |
| share_token  | text UNIQUE            |      |
| created_at   | timestamptz            |      |

## user_unlocks

| 컬럼        | 타입                  | 설명                 |
| ----------- | --------------------- | -------------------- |
| id          | uuid PK               |                      |
| user_id     | uuid FK → profiles.id |                      |
| item_type   | enum                  |                      |
| item_id     | uuid                  | themes 또는 moods id |
| unlocked_at | timestamptz           |                      |
