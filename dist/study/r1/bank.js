globalThis.toeicStudyBank = {
  "examId": "field-study-01",
  "revision": 1,
  "parts": [
    {
      "part": 1,
      "titleJa": "写真描写",
      "sets": [
        {
          "setId": "p1-action",
          "part": 1,
          "setting": "発送台での梱包",
          "passages": [],
          "media": {
            "photo": {
              "id": "photo",
              "src": "study/r1/photos/p1-action.webp",
              "altJa": "練習用の写真",
              "descriptionJa": "作業員がテープを使って段ボール箱を閉じています。",
              "prompt": "Use case: photorealistic-natural. Produce a single 3:2 landscape editorial photo for an original English listening exercise. Single fictional employee, dressed in a plain dark-green apron, standing next to a packing bench in a small workplace, pressing a handheld tape dispenser against the visible top seam of one large cardboard carton and drawing a strip of clear packing tape along the seam. Both hands visible, one on tape dispenser and the other steadying the box. Clearly readable hands, tool, and seam even at phone size, camera at a slight three-quarter angle, medium framing. No scissors, no pen, no lifting the carton, no opening flaps, no other person. Natural daylight, realistic proportions, clear visual evidence. No printed lettering, branding or watermark.",
              "revision": 1,
              "generator": "Codex ImageGen",
              "reviewer": "Codex",
              "sha256": "7ebf32ca2ec5e5881f8c92ef79e7695c18535029e42fd7b797c9cf1ea5167d76"
            },
            "audio": {
              "src": "study/r1/audio/p1-action.mp3",
              "durationMs": 18710,
              "scriptSha256": "b0fe12ee36ee87c449a18230a5f1b21deab453ba5fad9157ce84e78a56915dbf",
              "sha256": "8b083379f030ee418a5fbe627a1491e31ae8e55eac0116358b3217a2fa6cc716",
              "masterSha256": "68ef65a6564269a33127fd1f45b32cf9139dbe4ab822f9aaee31e047a9cac10d"
            }
          },
          "items": [
            {
              "id": "fs1-p1-action",
              "skill": "動作",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "A worker is sealing a carton with tape."
                },
                {
                  "id": "B",
                  "text": "A worker is writing on the side of a carton."
                },
                {
                  "id": "C",
                  "text": "A worker is lifting a carton off a bench."
                },
                {
                  "id": "D",
                  "text": "A worker is opening the flaps of a carton."
                }
              ],
              "choiceExplanationsJa": {
                "A": "作業員はテープカッターを箱の合わせ目に当てて、テープを貼っています。",
                "B": "手に持っているのはペンではなくテープカッターで、当てている場所は箱の上面です。",
                "C": "箱の底は台に載ったままで、作業員の片手はテープカッターを握っています。",
                "D": "ふたは閉じており、その合わせ目にテープを貼っています。"
              },
              "translationJa": {
                "choices": {
                  "A": "作業員がテープで段ボール箱を閉じています。",
                  "B": "作業員が段ボール箱の側面に文字を書いています。",
                  "C": "作業員が作業台から段ボール箱を持ち上げています。",
                  "D": "作業員が段ボール箱のふたを開けています。"
                },
                "stem": "写真に最も合う描写を選びます。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "photo"
                  ],
                  "detailJa": "作業員はテープカッターを箱の合わせ目に当てて、テープを貼っています。"
                }
              ],
              "answerId": "A",
              "explanationJa": "作業員はテープカッターを箱の合わせ目に当てて、テープを貼っています。",
              "vocabulary": [
                {
                  "term": "seal",
                  "meaningJa": "密封する、この写真ではテープで閉じる"
                },
                {
                  "term": "carton",
                  "meaningJa": "段ボール箱"
                },
                {
                  "term": "flap",
                  "meaningJa": "折り曲げて閉じるふたの部分"
                }
              ],
              "number": 1
            }
          ],
          "audioScript": [
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, A worker is sealing a carton with tape.",
              "translationJa": "作業員がテープで段ボール箱を閉じています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, A worker is writing on the side of a carton.",
              "translationJa": "作業員が段ボール箱の側面に文字を書いています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, A worker is lifting a carton off a bench.",
              "translationJa": "作業員が作業台から段ボール箱を持ち上げています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-D",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice D, A worker is opening the flaps of a carton.",
              "translationJa": "作業員が段ボール箱のふたを開けています。",
              "pauseAfterMs": 640
            }
          ]
        },
        {
          "setId": "p1-state",
          "part": 1,
          "setting": "作業場の保護具",
          "passages": [],
          "media": {
            "photo": {
              "id": "photo",
              "src": "study/r1/photos/p1-state.webp",
              "altJa": "練習用の写真",
              "descriptionJa": "黄色いヘルメットが壁のフックからつり下がっています。",
              "prompt": "Use case: photorealistic-natural. Produce a single 3:2 landscape editorial photo for an original English listening exercise. An unoccupied community workshop coat area. Four conspicuous, simple yellow protective helmets hang from individual wall hooks by their straps on a plain wall. The helmets are suspended in clear view well above an empty wooden bench. No person, no helmets on the bench or floor, no helmets piled or stacked, no cabinet, no table. Neutral side lighting with the wall hooks and straps clearly visible. Natural daylight, realistic proportions, clear visual evidence. No printed lettering, branding or watermark.",
              "revision": 1,
              "generator": "Codex ImageGen",
              "reviewer": "Codex",
              "sha256": "8d37bbcfddd39c08b350e461a52a27e03bf3d90159e2184a19e779df5f479deb"
            },
            "audio": {
              "src": "study/r1/audio/p1-state.mp3",
              "durationMs": 17410,
              "scriptSha256": "78fbd1d827d1fffec40f4dafe1b10403f0465c2817f7efd0eadc0d3f5e34741c",
              "sha256": "4fbf6b479ad0f49e4f3619006cabf2578a9b0dfea92a5e1a01403169363185f4",
              "masterSha256": "a9f1017b4cd365ca6836668c2e994f916167852cdd1e910c7a9685d29793fd6d"
            }
          },
          "items": [
            {
              "id": "fs1-p1-state",
              "skill": "状態",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "Some helmets are stacked on the floor."
                },
                {
                  "id": "B",
                  "text": "Some helmets have been placed on a bench."
                },
                {
                  "id": "C",
                  "text": "Some helmets are hanging from hooks."
                },
                {
                  "id": "D",
                  "text": "Some helmets are being worn by workers."
                }
              ],
              "choiceExplanationsJa": {
                "A": "床の上に重ねて置かれているヘルメットは見えません。",
                "B": "ベンチの座面は空いており、ヘルメットはその上方の壁にあります。",
                "C": "黄色いヘルメットが、壁のフックからそれぞれつり下がっています。",
                "D": "人物が写っておらず、ヘルメットは壁に掛けられています。"
              },
              "translationJa": {
                "choices": {
                  "A": "いくつかのヘルメットが床に積み重ねられています。",
                  "B": "いくつかのヘルメットがベンチに置かれています。",
                  "C": "いくつかのヘルメットがフックからつり下がっています。",
                  "D": "いくつかのヘルメットを作業員がかぶっています。"
                },
                "stem": "写真に最も合う描写を選びます。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "photo"
                  ],
                  "detailJa": "黄色いヘルメットが、壁のフックからそれぞれつり下がっています。"
                }
              ],
              "answerId": "C",
              "explanationJa": "黄色いヘルメットが、壁のフックからそれぞれつり下がっています。",
              "vocabulary": [
                {
                  "term": "helmet",
                  "meaningJa": "ヘルメット"
                },
                {
                  "term": "hang from",
                  "meaningJa": "～からつり下がる"
                },
                {
                  "term": "hook",
                  "meaningJa": "フック"
                },
                {
                  "term": "stack",
                  "meaningJa": "積み重ねる"
                }
              ],
              "number": 2
            }
          ],
          "audioScript": [
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, Some helmets are stacked on the floor.",
              "translationJa": "いくつかのヘルメットが床に積み重ねられています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, Some helmets have been placed on a bench.",
              "translationJa": "いくつかのヘルメットがベンチに置かれています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, Some helmets are hanging from hooks.",
              "translationJa": "いくつかのヘルメットがフックからつり下がっています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-D",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice D, Some helmets are being worn by workers.",
              "translationJa": "いくつかのヘルメットを作業員がかぶっています。",
              "pauseAfterMs": 640
            }
          ]
        },
        {
          "setId": "p1-position",
          "part": 1,
          "setting": "中庭のベンチ",
          "passages": [],
          "media": {
            "photo": {
              "id": "photo",
              "src": "study/r1/photos/p1-position.webp",
              "altJa": "練習用の写真",
              "descriptionJa": "ベンチが2つの植木鉢の間に置かれています。",
              "prompt": "Use case: photorealistic-natural. Produce a single 3:2 landscape editorial photo for an original English listening exercise. Quiet paved courtyard on an overcast day. An unoccupied dark wooden bench sits in clear view BETWEEN TWO matching large stone planters, one to the immediate left and one to the immediate right of the bench, arranged along the same line close to a blank wall. Show the full bench and both planters with ample space, straight-on view. No fountain, no stairs, no canopy or shelter, no people. Natural daylight, realistic proportions, clear visual evidence. No printed lettering, branding or watermark.",
              "revision": 1,
              "generator": "Codex ImageGen",
              "reviewer": "Codex",
              "sha256": "e0b8a4cc7a0816c72cc0b04d5879ede29b8efd43aaadc61650f02de3ea7dae7d"
            },
            "audio": {
              "src": "study/r1/audio/p1-position.mp3",
              "durationMs": 18460,
              "scriptSha256": "db6c45933bab75697ae5bce56b32e750ebe45c4172e246298b9c74c87d0644db",
              "sha256": "9129437a743fb71b48819e685dc900342adfb89aac9f553661b980f6f346b82a",
              "masterSha256": "afa099ab895c1c0333793aea1abbbfdf83a275152f62ae554cc306cf9dfaf44f"
            }
          },
          "items": [
            {
              "id": "fs1-p1-position",
              "skill": "位置関係",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "A bench has been placed next to a fountain."
                },
                {
                  "id": "B",
                  "text": "A bench is positioned between two planters."
                },
                {
                  "id": "C",
                  "text": "A bench is standing at the top of some steps."
                },
                {
                  "id": "D",
                  "text": "A bench is sheltered under a canopy."
                }
              ],
              "choiceExplanationsJa": {
                "A": "ベンチの脇に見えるのは植木鉢で、噴水はありません。",
                "B": "ベンチの左と右に石の植木鉢が1つずつあります。",
                "C": "ベンチと植木鉢は平らな舗装面にあり、段差の上にはありません。",
                "D": "背後に壁はありますが、ベンチの上を覆うひさしは見えません。"
              },
              "translationJa": {
                "choices": {
                  "A": "ベンチが噴水の隣に置かれています。",
                  "B": "ベンチが2つの植木鉢の間に置かれています。",
                  "C": "ベンチが階段を上り切った所に置かれています。",
                  "D": "ベンチがひさしの下に置かれています。"
                },
                "stem": "写真に最も合う描写を選びます。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "photo"
                  ],
                  "detailJa": "ベンチの左と右に石の植木鉢が1つずつあります。"
                }
              ],
              "answerId": "B",
              "explanationJa": "ベンチの左と右に石の植木鉢が1つずつあります。",
              "vocabulary": [
                {
                  "term": "position",
                  "meaningJa": "所定の位置に置く"
                },
                {
                  "term": "planter",
                  "meaningJa": "植木鉢"
                },
                {
                  "term": "steps",
                  "meaningJa": "階段、段"
                },
                {
                  "term": "canopy",
                  "meaningJa": "覆い、ひさし"
                }
              ],
              "number": 3
            }
          ],
          "audioScript": [
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, A bench has been placed next to a fountain.",
              "translationJa": "ベンチが噴水の隣に置かれています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, A bench is positioned between two planters.",
              "translationJa": "ベンチが2つの植木鉢の間に置かれています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, A bench is standing at the top of some steps.",
              "translationJa": "ベンチが階段を上り切った所に置かれています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-D",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice D, A bench is sheltered under a canopy.",
              "translationJa": "ベンチがひさしの下に置かれています。",
              "pauseAfterMs": 640
            }
          ]
        }
      ]
    },
    {
      "part": 2,
      "titleJa": "応答",
      "sets": [
        {
          "setId": "p2-wh",
          "part": 2,
          "setting": "掲示物の配布",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "Where should I put the extra copies of the event schedule?",
              "translationJa": "余った催しの日程表はどこに置けばいいですか。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p2-wh.mp3",
              "durationMs": 15815,
              "scriptSha256": "d7e47f2db595bb930b16cc7dc015ceedde44693b642e64f764258704ff57ef1b",
              "sha256": "e11f98c9f343e1a08d6d53a21b4800fa55f549b44cb9b34519bb648e5ff31a52",
              "masterSha256": "c671cb41e77cbc6f50a83dae163e39817d23b99d2ef401776b72160d94678ea7"
            }
          },
          "items": [
            {
              "id": "fs1-p2-wh",
              "skill": "疑問詞への応答",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "There are ten copies left."
                },
                {
                  "id": "B",
                  "text": "The event starts at eleven."
                },
                {
                  "id": "C",
                  "text": "On the shelf by the entrance."
                }
              ],
              "choiceExplanationsJa": {
                "A": "残りの部数に答えていますが、置く場所を示していません。",
                "B": "催しの開始時刻で、日程表の置き場所とは関係ありません。",
                "C": "棚を指定し、入口を目印にして置き場所を答えています。"
              },
              "translationJa": {
                "choices": {
                  "A": "10部残っています。",
                  "B": "催しは11時に始まります。",
                  "C": "入口のそばの棚にお願いします。"
                },
                "stem": "余った日程表の置き場所を尋ねています。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "棚を指定し、入口を目印にして置き場所を答えています。"
                }
              ],
              "answerId": "C",
              "explanationJa": "棚を指定し、入口を目印にして置き場所を答えています。",
              "vocabulary": [
                {
                  "term": "extra",
                  "meaningJa": "余分の"
                },
                {
                  "term": "event schedule",
                  "meaningJa": "催しの日程表"
                },
                {
                  "term": "by the entrance",
                  "meaningJa": "入口のそばに"
                }
              ],
              "number": 4
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "Where should I put the extra copies of the event schedule?",
              "translationJa": "余った催しの日程表はどこに置けばいいですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, There are ten copies left.",
              "translationJa": "10部残っています。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, The event starts at eleven.",
              "translationJa": "催しは11時に始まります。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, On the shelf by the entrance.",
              "translationJa": "入口のそばの棚にお願いします。",
              "pauseAfterMs": 640
            }
          ]
        },
        {
          "setId": "p2-yes-no",
          "part": 2,
          "setting": "店舗の設備",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "Do we need a key to open the side entrance?",
              "translationJa": "通用口を開けるには鍵が必要ですか。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p2-yes-no.mp3",
              "durationMs": 15540,
              "scriptSha256": "84b9ce49ca30b3ab455783a517f0abe13707ec156174e2a511c6cd3ad57ed445",
              "sha256": "642fbb957aeeba09300af0661d6643c88939a6c7b96d3c771b2ff13c3bd19fba",
              "masterSha256": "1b6d98291c8c37818417294f560095d63476c35ee23204a55492515542cce053"
            }
          },
          "items": [
            {
              "id": "fs1-p2-yes-no",
              "skill": "Yes・No疑問文",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "Yes, you can pick one up at reception."
                },
                {
                  "id": "B",
                  "text": "The delivery arrived early."
                },
                {
                  "id": "C",
                  "text": "It's wider than the front door."
                }
              ],
              "choiceExplanationsJa": {
                "A": "鍵が必要だと肯定し、one が指す鍵を受け取れる場所も伝えています。",
                "B": "配送時刻について述べていますが、通用口を開ける条件は説明していません。",
                "C": "通用口の幅の説明で、開けるのに鍵が必要かどうかは分かりません。"
              },
              "translationJa": {
                "choices": {
                  "A": "はい、受付で受け取れます。",
                  "B": "届け物は早く着きました。",
                  "C": "正面のドアより広いです。"
                },
                "stem": "通用口を開けるために鍵が必要か尋ねています。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "鍵が必要だと肯定し、one が指す鍵を受け取れる場所も伝えています。"
                }
              ],
              "answerId": "A",
              "explanationJa": "鍵が必要だと肯定し、one が指す鍵を受け取れる場所も伝えています。",
              "vocabulary": [
                {
                  "term": "need a key",
                  "meaningJa": "鍵が必要である"
                },
                {
                  "term": "side entrance",
                  "meaningJa": "建物脇の入口、通用口"
                },
                {
                  "term": "pick one up",
                  "meaningJa": "それを1つ受け取る"
                }
              ],
              "number": 5
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "Do we need a key to open the side entrance?",
              "translationJa": "通用口を開けるには鍵が必要ですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, Yes, you can pick one up at reception.",
              "translationJa": "はい、受付で受け取れます。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, The delivery arrived early.",
              "translationJa": "届け物は早く着きました。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, It's wider than the front door.",
              "translationJa": "正面のドアより広いです。",
              "pauseAfterMs": 640
            }
          ]
        },
        {
          "setId": "p2-request",
          "part": 2,
          "setting": "説明会の準備",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Could you send the slides to everyone before the briefing?",
              "translationJa": "説明会の前に、スライドを全員に送ってもらえますか。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p2-request.mp3",
              "durationMs": 17465,
              "scriptSha256": "7bf127b24f58427c74d0e1387ddb9ca7f01b104c240a55cfa1654f1dc26ca5c6",
              "sha256": "baea4b45f4e735c79862ed5a5e36c0a88bf3e5e462d33880730a16576cfe24a6",
              "masterSha256": "612632ee0e96791d17a5753e73097f84e00daa53a0f26718adc43a93f6bf4f48"
            }
          },
          "items": [
            {
              "id": "fs1-p2-request",
              "skill": "依頼・提案への応答",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "Everyone arrived a little early."
                },
                {
                  "id": "B",
                  "text": "Sure. I'll email them as soon as I get back to my desk."
                },
                {
                  "id": "C",
                  "text": "The last slide shows our sales figures."
                }
              ],
              "choiceExplanationsJa": {
                "A": "参加者の到着について述べており、スライドを送る依頼には答えていません。",
                "B": "依頼を引き受け、them でスライドを指して送付する時点を伝えています。",
                "C": "資料の内容についての説明で、送付するかどうかは伝えていません。"
              },
              "translationJa": {
                "choices": {
                  "A": "皆さん少し早く到着しました。",
                  "B": "もちろんです。席に戻り次第メールで送ります。",
                  "C": "最後のスライドに売上の数字が載っています。"
                },
                "stem": "説明会が始まる前の資料送付を頼んでいます。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "依頼を引き受け、them でスライドを指して送付する時点を伝えています。"
                }
              ],
              "answerId": "B",
              "explanationJa": "依頼を引き受け、them でスライドを指して送付する時点を伝えています。",
              "vocabulary": [
                {
                  "term": "briefing",
                  "meaningJa": "説明会"
                },
                {
                  "term": "slides",
                  "meaningJa": "発表用スライド"
                },
                {
                  "term": "as soon as",
                  "meaningJa": "～するとすぐに"
                }
              ],
              "number": 6
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Could you send the slides to everyone before the briefing?",
              "translationJa": "説明会の前に、スライドを全員に送ってもらえますか。",
              "pauseAfterMs": 420
            },
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "Choice A, Everyone arrived a little early.",
              "translationJa": "皆さん少し早く到着しました。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "Choice B, Sure. I'll email them as soon as I get back to my desk.",
              "translationJa": "もちろんです。席に戻り次第メールで送ります。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "Choice C, The last slide shows our sales figures.",
              "translationJa": "最後のスライドに売上の数字が載っています。",
              "pauseAfterMs": 640
            }
          ]
        },
        {
          "setId": "p2-indirect",
          "part": 2,
          "setting": "荷物の受け渡し",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Has the courier picked up the parcel yet?",
              "translationJa": "配達員はもう荷物を集荷しましたか。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p2-indirect.mp3",
              "durationMs": 15590,
              "scriptSha256": "ce86023955893bbbd079ed0790d4eb4d212b810bdff956d2df7700a840457d59",
              "sha256": "f7760decafc37c9f6d6e3725739c7a0270e7713cc9d41a2c3b682b3a6d6f6031",
              "masterSha256": "12743501e1218b825bd559be815f6675bb56116f4f0cfcddf4b2a48c551af06d"
            }
          },
          "items": [
            {
              "id": "fs1-p2-indirect",
              "skill": "間接応答",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "It weighs nearly two kilos."
                },
                {
                  "id": "B",
                  "text": "The address is on the label."
                },
                {
                  "id": "C",
                  "text": "It's still on the table by the door."
                }
              ],
              "choiceExplanationsJa": {
                "A": "荷物の重量は分かりますが、集荷が済んだかどうかは示していません。",
                "B": "荷物の宛先を確認する方法で、受け渡しの状況とは別です。",
                "C": "荷物が集荷前の場所にまだあるため、配達員は持っていっていないと分かります。"
              },
              "translationJa": {
                "choices": {
                  "A": "重さは2キロ近くあります。",
                  "B": "住所はラベルに書いてあります。",
                  "C": "まだドア脇のテーブルにあります。"
                },
                "stem": "話し手は集荷が済んだか確かめようとしています。"
              },
              "stem": "",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "荷物が集荷前の場所にまだあるため、配達員は持っていっていないと分かります。"
                }
              ],
              "answerId": "C",
              "explanationJa": "荷物が集荷前の場所にまだあるため、配達員は持っていっていないと分かります。",
              "vocabulary": [
                {
                  "term": "courier",
                  "meaningJa": "配達員"
                },
                {
                  "term": "pick up a parcel",
                  "meaningJa": "荷物を集荷する"
                },
                {
                  "term": "yet",
                  "meaningJa": "もう、疑問文で完了の有無を尋ねる"
                }
              ],
              "number": 7
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Has the courier picked up the parcel yet?",
              "translationJa": "配達員はもう荷物を集荷しましたか。",
              "pauseAfterMs": 420
            },
            {
              "id": "choice-A",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice A, It weighs nearly two kilos.",
              "translationJa": "重さは2キロ近くあります。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-B",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice B, The address is on the label.",
              "translationJa": "住所はラベルに書いてあります。",
              "pauseAfterMs": 640
            },
            {
              "id": "choice-C",
              "type": "choice",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Choice C, It's still on the table by the door.",
              "translationJa": "まだドア脇のテーブルにあります。",
              "pauseAfterMs": 640
            }
          ]
        }
      ]
    },
    {
      "part": 3,
      "titleJa": "会話",
      "sets": [
        {
          "setId": "p3-purpose",
          "part": 3,
          "setting": "店舗への展示棚の搬入相談",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "The new display shelves are coming tomorrow morning. Is there somewhere we can keep them until the installer arrives on Friday?",
              "translationJa": "新しい陳列棚が明日の朝に届く予定です。金曜日に設置担当者が来るまで、どこかに置いておけませんか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "The back room is full of sale stock, but the meeting room is free this week. How wide are the boxes?",
              "translationJa": "裏の部屋はセール用の在庫でいっぱいですが、会議室なら今週は空いています。箱の幅はどれくらいですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "About a metre. They should fit through that door. I'll tell the driver to bring them straight there.",
              "translationJa": "1メートルほどです。そのドアを通れるはずです。運転手にはまっすぐそこへ運ぶよう伝えます。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p3-purpose.mp3",
              "durationMs": 26335,
              "scriptSha256": "e90032ba425c07ba7349051ef6b2bdbfd6cb82f08128691ea5d63dfcea6482c0",
              "sha256": "c84925a603dfa307998a0245bc4a1eb7a60c628e697171109b54ad3f0366c3a4",
              "masterSha256": "4c9a1d7319fbe61413dccfd2c9b99a2553ff34379e26effd2a1527cf28b1f06b"
            }
          },
          "items": [
            {
              "id": "fs1-p3-purpose",
              "skill": "目的・場面",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "To request a delivery date change."
                },
                {
                  "id": "B",
                  "text": "To find a place to store some items temporarily."
                },
                {
                  "id": "C",
                  "text": "To arrange for a display to be taken down."
                },
                {
                  "id": "D",
                  "text": "To check whether a meeting can go ahead."
                }
              ],
              "choiceExplanationsJa": {
                "A": "納品は明朝の予定のままで、女性が運転手に連絡するのは建物内の搬入先を指定するためです。",
                "B": "女性は、金曜に設置担当者が到着するまで棚を置ける場所があるか尋ねています。",
                "C": "陳列棚は新しく届く品物で、会話で扱うのは設置前の保管です。",
                "D": "会議室は空いているという情報が棚の置き場所を決める手がかりになります。会議の開催は相談していません。"
              },
              "translationJa": {
                "choices": {
                  "A": "配達日の変更を頼むため。",
                  "B": "品物を一時的に保管する場所を探すため。",
                  "C": "展示を撤去する手配をするため。",
                  "D": "会議を予定どおり開けるか確認するため。"
                },
                "stem": "女性はなぜ男性に話しかけますか。"
              },
              "stem": "Why does the woman speak to the man?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "t2"
                  ],
                  "detailJa": "女性は、金曜に設置担当者が到着するまで棚を置ける場所があるか尋ねています。"
                }
              ],
              "answerId": "B",
              "explanationJa": "女性は、金曜に設置担当者が到着するまで棚を置ける場所があるか尋ねています。",
              "vocabulary": [
                {
                  "term": "display shelf",
                  "meaningJa": "陳列棚"
                },
                {
                  "term": "installer",
                  "meaningJa": "設置担当者"
                },
                {
                  "term": "sale stock",
                  "meaningJa": "セール用の在庫"
                },
                {
                  "term": "fit through",
                  "meaningJa": "～を通れる"
                }
              ],
              "number": 8
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "The new display shelves are coming tomorrow morning. Is there somewhere we can keep them until the installer arrives on Friday?",
              "translationJa": "新しい陳列棚が明日の朝に届く予定です。金曜日に設置担当者が来るまで、どこかに置いておけませんか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "The back room is full of sale stock, but the meeting room is free this week. How wide are the boxes?",
              "translationJa": "裏の部屋はセール用の在庫でいっぱいですが、会議室なら今週は空いています。箱の幅はどれくらいですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "About a metre. They should fit through that door. I'll tell the driver to bring them straight there.",
              "translationJa": "1メートルほどです。そのドアを通れるはずです。運転手にはまっすぐそこへ運ぶよう伝えます。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "Why does the woman speak to the man?",
              "translationJa": "女性はなぜ男性に話しかけますか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p3-detail",
          "part": 3,
          "setting": "工房見学の送迎バス",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "I booked the shuttle for the pottery studio tour. Should I be at the hotel entrance by eight fifteen?",
              "translationJa": "陶芸工房の見学ツアーの送迎バスを予約しました。8時15分までにホテルの玄関に行けばよいですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "That was the time in the first email. The shuttle now leaves the hotel at eight forty because the studio is opening later.",
              "translationJa": "それは最初のメールにあった時刻です。工房の開館が遅くなったので、バスはホテルを8時40分に出るよう変更されました。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "I see. Does that affect our return time?",
              "translationJa": "分かりました。それで帰りの時刻も変わりますか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t4",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "The return shuttle is still at eleven thirty. The studio has moved the demonstration to nine thirty, so you'll still have time to look around.",
              "translationJa": "帰りのバスは11時30分のままです。工房での実演が9時30分に移ったので、見て回る時間は取れます。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p3-detail.mp3",
              "durationMs": 34930,
              "scriptSha256": "117125d7fe046450adb598ccc00cbd1116cba7abab70205fb0c18dc7e1e51724",
              "sha256": "6a1620848f7ba276aaa9c3b924be84fe80d15d22bb5ace80bf694efa61b9e221",
              "masterSha256": "df7e3b3221aef3cb6780b72e3e8cfff81bca2467586c6d2261218e5b637ff2a8"
            }
          },
          "items": [
            {
              "id": "fs1-p3-detail",
              "skill": "詳細",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "At 8:15."
                },
                {
                  "id": "B",
                  "text": "At 9:30."
                },
                {
                  "id": "C",
                  "text": "At 11:30."
                },
                {
                  "id": "D",
                  "text": "At 8:40."
                }
              ],
              "choiceExplanationsJa": {
                "A": "最初のメールの時刻です。女性は開館時刻の変更に伴い、バスの時刻も変わったと説明しています。",
                "B": "新しい実演開始時刻です。ホテルを出発する送迎バスの時刻とは別です。",
                "C": "工房見学を終えた後、帰りの送迎バスに乗る時刻です。",
                "D": "女性が now leaves the hotel at eight forty と新しい出発時刻を伝えています。"
              },
              "translationJa": {
                "choices": {
                  "A": "8時15分。",
                  "B": "9時30分。",
                  "C": "11時30分。",
                  "D": "8時40分。"
                },
                "stem": "送迎バスは何時にホテルを出発しますか。"
              },
              "stem": "When will the shuttle leave the hotel?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "t2",
                    "t4"
                  ],
                  "detailJa": "女性が now leaves the hotel at eight forty と新しい出発時刻を伝えています。"
                }
              ],
              "answerId": "D",
              "explanationJa": "女性が now leaves the hotel at eight forty と新しい出発時刻を伝えています。",
              "vocabulary": [
                {
                  "term": "shuttle",
                  "meaningJa": "送迎バス"
                },
                {
                  "term": "pottery studio",
                  "meaningJa": "陶芸工房"
                },
                {
                  "term": "affect",
                  "meaningJa": "～に影響する"
                },
                {
                  "term": "demonstration",
                  "meaningJa": "実演"
                }
              ],
              "number": 9
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "I booked the shuttle for the pottery studio tour. Should I be at the hotel entrance by eight fifteen?",
              "translationJa": "陶芸工房の見学ツアーの送迎バスを予約しました。8時15分までにホテルの玄関に行けばよいですか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "That was the time in the first email. The shuttle now leaves the hotel at eight forty because the studio is opening later.",
              "translationJa": "それは最初のメールにあった時刻です。工房の開館が遅くなったので、バスはホテルを8時40分に出るよう変更されました。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "I see. Does that affect our return time?",
              "translationJa": "分かりました。それで帰りの時刻も変わりますか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t4",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "The return shuttle is still at eleven thirty. The studio has moved the demonstration to nine thirty, so you'll still have time to look around.",
              "translationJa": "帰りのバスは11時30分のままです。工房での実演が9時30分に移ったので、見て回る時間は取れます。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "When will the shuttle leave the hotel?",
              "translationJa": "送迎バスは何時にホテルを出発しますか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p3-next",
          "part": 3,
          "setting": "社内研修の教材配送",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "I packed the training manuals for the branch office. Is the courier coming to the reception desk?",
              "translationJa": "支店向けの研修マニュアルを箱詰めしました。配達員は受付まで来ますか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Yes, at four. Did you print the shipping label? They won't accept a box without one.",
              "translationJa": "はい、4時です。発送ラベルは印刷しましたか。ラベルが付いていない箱は引き取ってもらえません。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "It's in my email. I'll print it right now and tape it to the box before I take the box downstairs.",
              "translationJa": "メールで届いています。今すぐ印刷して箱に貼ってから、下の階へ持っていきます。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p3-next.mp3",
              "durationMs": 26535,
              "scriptSha256": "559f0120a083947023fa788e5876d0f7da49dc17b77520b7d8fa876a204b0e7e",
              "sha256": "4852fb82eb9b7eac65f703cea51fefd2fe4a6022e06f3496f2846d4417e2037a",
              "masterSha256": "8397fda03b569f4026d51758a7858dda657ac2d56c5ade4cd654e3aff099b7ef"
            }
          },
          "items": [
            {
              "id": "fs1-p3-next",
              "skill": "次の行動",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "Print a shipping label."
                },
                {
                  "id": "B",
                  "text": "Take a box downstairs."
                },
                {
                  "id": "C",
                  "text": "Pack the training manuals."
                },
                {
                  "id": "D",
                  "text": "Contact the delivery company."
                }
              ],
              "choiceExplanationsJa": {
                "A": "女性は right now と言い、箱に貼って運ぶ前に、まずメールにある発送ラベルを印刷すると述べています。",
                "B": "下の階に運ぶのは、印刷したラベルを箱に貼った後です。",
                "C": "女性は最初の発言で梱包を終えたと伝えています。",
                "D": "集荷場所と時刻はすでに確認できており、女性が直ちに行うと述べたのは印刷です。"
              },
              "translationJa": {
                "choices": {
                  "A": "発送ラベルを印刷する。",
                  "B": "箱を下の階へ持っていく。",
                  "C": "研修マニュアルを箱詰めする。",
                  "D": "配送会社に連絡する。"
                },
                "stem": "女性は会話の直後に何をする可能性が最も高いですか。"
              },
              "stem": "What will the woman most likely do immediately after the conversation?",
              "evidence": [
                {
                  "refIds": [
                    "t2",
                    "t3"
                  ],
                  "detailJa": "女性は right now と言い、箱に貼って運ぶ前に、まずメールにある発送ラベルを印刷すると述べています。"
                }
              ],
              "answerId": "A",
              "explanationJa": "女性は right now と言い、箱に貼って運ぶ前に、まずメールにある発送ラベルを印刷すると述べています。",
              "vocabulary": [
                {
                  "term": "pack",
                  "meaningJa": "梱包する"
                },
                {
                  "term": "courier",
                  "meaningJa": "集配員"
                },
                {
                  "term": "shipping label",
                  "meaningJa": "発送ラベル"
                },
                {
                  "term": "tape A to B",
                  "meaningJa": "AをBにテープで貼る"
                }
              ],
              "number": 10
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "I packed the training manuals for the branch office. Is the courier coming to the reception desk?",
              "translationJa": "支店向けの研修マニュアルを箱詰めしました。配達員は受付まで来ますか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Yes, at four. Did you print the shipping label? They won't accept a box without one.",
              "translationJa": "はい、4時です。発送ラベルは印刷しましたか。ラベルが付いていない箱は引き取ってもらえません。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "It's in my email. I'll print it right now and tape it to the box before I take the box downstairs.",
              "translationJa": "メールで届いています。今すぐ印刷して箱に貼ってから、下の階へ持っていきます。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "What will the woman most likely do immediately after the conversation?",
              "translationJa": "女性は会話の直後に何をする可能性が最も高いですか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p3-intent",
          "part": 3,
          "setting": "説明会の配付資料の準備",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "I only printed twenty copies of the handout for this afternoon's briefing. Should I go back and print some more?",
              "translationJa": "午後の説明会の資料を20部しか印刷していません。戻ってもう少し印刷しましょうか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "There are eighteen names on the sign-up sheet. And the presenter has her own copy.",
              "translationJa": "申込者名簿には18人の名前が載っています。発表者も自分の分を持っています。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "All right. I'll put these on the chairs before the briefing starts.",
              "translationJa": "分かりました。説明会が始まる前に、この資料を椅子の上に置いておきます。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p3-intent.mp3",
              "durationMs": 24860,
              "scriptSha256": "93154b3b3de4a1e543c2d1b7d9b0d52f8892c7faa57c419e4449f43dfa235ff8",
              "sha256": "d2b77e17f423c23e42c5538d2658ac0432b69991f649bc3e931d9e30a89f445f",
              "masterSha256": "36c39d299172ac3368b8e679d3285ad2ccbc7f24e935598223589a2f35dfb730"
            }
          },
          "items": [
            {
              "id": "fs1-p3-intent",
              "skill": "発言の意図",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "The sign-up sheet needs to be printed."
                },
                {
                  "id": "B",
                  "text": "Two people have cancelled their reservations."
                },
                {
                  "id": "C",
                  "text": "The copies already printed should be sufficient."
                },
                {
                  "id": "D",
                  "text": "The presenter will bring extra handouts."
                }
              ],
              "choiceExplanationsJa": {
                "A": "申込用紙は参加人数の根拠であり、印刷の相談の対象は説明会の配付資料です。",
                "B": "20は印刷した資料の部数です。参加者数が20人から18人に減ったとは述べていません。",
                "C": "20部に対して参加者は18人で、発表者は自分の資料を持っています。追加印刷の必要はないと伝えています。",
                "D": "発表者が持っているのは自分用の1部です。参加者に配る予備を持参するという話はありません。"
              },
              "translationJa": {
                "choices": {
                  "A": "申込用紙を印刷する必要がある。",
                  "B": "2人が予約を取り消した。",
                  "C": "すでに印刷した部数で足りるはずだ。",
                  "D": "発表者が予備の資料を持ってくる。"
                },
                "stem": "女性は「申込者名簿には18人の名前が載っています」という発言で、何を伝えようとしていますか。"
              },
              "stem": "What does the woman imply when she says, “There are eighteen names on the sign-up sheet”?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "t2",
                    "t3"
                  ],
                  "detailJa": "20部に対して参加者は18人で、発表者は自分の資料を持っています。追加印刷の必要はないと伝えています。"
                }
              ],
              "answerId": "C",
              "explanationJa": "20部に対して参加者は18人で、発表者は自分の資料を持っています。追加印刷の必要はないと伝えています。",
              "vocabulary": [
                {
                  "term": "handout",
                  "meaningJa": "配付資料"
                },
                {
                  "term": "briefing",
                  "meaningJa": "説明会"
                },
                {
                  "term": "sign-up sheet",
                  "meaningJa": "申込者名簿"
                },
                {
                  "term": "presenter",
                  "meaningJa": "発表者"
                }
              ],
              "number": 11
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "I only printed twenty copies of the handout for this afternoon's briefing. Should I go back and print some more?",
              "translationJa": "午後の説明会の資料を20部しか印刷していません。戻ってもう少し印刷しましょうか。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "There are eighteen names on the sign-up sheet. And the presenter has her own copy.",
              "translationJa": "申込者名簿には18人の名前が載っています。発表者も自分の分を持っています。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "All right. I'll put these on the chairs before the briefing starts.",
              "translationJa": "分かりました。説明会が始まる前に、この資料を椅子の上に置いておきます。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "What does the woman imply when she says, “There are eighteen names on the sign-up sheet”?",
              "translationJa": "女性は「申込者名簿には18人の名前が載っています」という発言で、何を伝えようとしていますか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p3-chart",
          "part": 3,
          "setting": "園芸用品の配達車両の手配",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "The tall plants are going to the customer on Tallow Lane this morning. You'll need a high-roof van to carry them upright.",
              "translationJa": "背の高い植物は今朝、タロー通りのお客様のところへ運びます。立てたまま運ぶため、ハイルーフのバンが必要です。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "They won't be packed until nine thirty, so there's no point picking up a van before then.",
              "translationJa": "梱包が終わるのは9時30分なので、それより前にバンを受け取っても意味がありません。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "The rental desk can't hold a van past its listed pickup time today. I'll book the earliest high-roof van we can pick up once the plants are packed.",
              "translationJa": "今日は貸出窓口で、表にある受取時刻を過ぎて車両を取り置きできません。梱包が終わってから受け取れるハイルーフ車のうち、一番早いものを予約します。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "table": {
              "id": "table",
              "caption": "Delivery vans available",
              "translationJa": "利用可能な配送車両",
              "rows": [
                [
                  {
                    "id": "r0c1",
                    "text": "Van",
                    "translationJa": "車両"
                  },
                  {
                    "id": "r0c2",
                    "text": "Pickup time",
                    "translationJa": "受取時刻"
                  },
                  {
                    "id": "r0c3",
                    "text": "Roof height",
                    "translationJa": "屋根の高さ"
                  }
                ],
                [
                  {
                    "id": "r1c1",
                    "text": "Wren",
                    "translationJa": "レン号"
                  },
                  {
                    "id": "r1c2",
                    "text": "9:15 a.m.",
                    "translationJa": "午前9時15分"
                  },
                  {
                    "id": "r1c3",
                    "text": "High",
                    "translationJa": "高い"
                  }
                ],
                [
                  {
                    "id": "r2c1",
                    "text": "Finch",
                    "translationJa": "フィンチ号"
                  },
                  {
                    "id": "r2c2",
                    "text": "9:40 a.m.",
                    "translationJa": "午前9時40分"
                  },
                  {
                    "id": "r2c3",
                    "text": "Standard",
                    "translationJa": "標準"
                  }
                ],
                [
                  {
                    "id": "r3c1",
                    "text": "Oriole",
                    "translationJa": "オリオール号"
                  },
                  {
                    "id": "r3c2",
                    "text": "10:00 a.m.",
                    "translationJa": "午前10時"
                  },
                  {
                    "id": "r3c3",
                    "text": "High",
                    "translationJa": "高い"
                  }
                ],
                [
                  {
                    "id": "r4c1",
                    "text": "Swift",
                    "translationJa": "スウィフト号"
                  },
                  {
                    "id": "r4c2",
                    "text": "10:20 a.m.",
                    "translationJa": "午前10時20分"
                  },
                  {
                    "id": "r4c3",
                    "text": "High",
                    "translationJa": "高い"
                  }
                ]
              ]
            },
            "audio": {
              "src": "study/r1/audio/p3-chart.mp3",
              "durationMs": 29110,
              "scriptSha256": "2a3524997e0681312537bffea2f3ab064ecb1c75792db0a6242e55abbe360dc5",
              "sha256": "039c1b1b1dd5c170ae7ed2eb7c6672cb061920bfb299a52b3fc64e9431eecb49",
              "masterSha256": "dd3343dd58e1ff70ba4008878ed77b47024623381433344e5410ab2adf22079b"
            }
          },
          "items": [
            {
              "id": "fs1-p3-chart",
              "skill": "図表照合",
              "difficulty": "hard",
              "choices": [
                {
                  "id": "A",
                  "text": "Wren."
                },
                {
                  "id": "B",
                  "text": "Oriole."
                },
                {
                  "id": "C",
                  "text": "Finch."
                },
                {
                  "id": "D",
                  "text": "Swift."
                }
              ],
              "choiceExplanationsJa": {
                "A": "ハイルーフ車ですが、受け取れるのは午前9時15分です。梱包が終わる9時30分まで取り置きできません。",
                "B": "梱包完了は午前9時30分です。表でそれ以降に受け取れるハイルーフ車を比べると、午前10時のOrioleが最も早く利用できます。",
                "C": "午前9時40分に受け取れますが、屋根の高さは標準です。植物を立てて積むためのハイルーフ車という条件に合いません。",
                "D": "ハイルーフ車で梱包後に受け取れますが、午前10時20分はOrioleより遅い時刻です。"
              },
              "translationJa": {
                "choices": {
                  "A": "レン号。",
                  "B": "オリオール号。",
                  "C": "フィンチ号。",
                  "D": "スウィフト号。"
                },
                "stem": "表を見てください。どの配送車両が予約されますか。"
              },
              "stem": "Look at the table. Which van will be booked?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "t2",
                    "t3",
                    "r1c2",
                    "r2c3",
                    "r3c1",
                    "r3c2",
                    "r3c3",
                    "r4c2"
                  ],
                  "detailJa": "梱包完了は午前9時30分です。表でそれ以降に受け取れるハイルーフ車を比べると、午前10時のOrioleが最も早く利用できます。"
                }
              ],
              "answerId": "B",
              "explanationJa": "梱包完了は午前9時30分です。表でそれ以降に受け取れるハイルーフ車を比べると、午前10時のOrioleが最も早く利用できます。",
              "vocabulary": [
                {
                  "term": "upright",
                  "meaningJa": "立てた状態で"
                },
                {
                  "term": "rental desk",
                  "meaningJa": "貸出窓口"
                },
                {
                  "term": "hold",
                  "meaningJa": "取り置く"
                },
                {
                  "term": "high-roof van",
                  "meaningJa": "天井の高いバン"
                }
              ],
              "number": 12
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "The tall plants are going to the customer on Tallow Lane this morning. You'll need a high-roof van to carry them upright.",
              "translationJa": "背の高い植物は今朝、タロー通りのお客様のところへ運びます。立てたまま運ぶため、ハイルーフのバンが必要です。",
              "pauseAfterMs": 420
            },
            {
              "id": "t2",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "They won't be packed until nine thirty, so there's no point picking up a van before then.",
              "translationJa": "梱包が終わるのは9時30分なので、それより前にバンを受け取っても意味がありません。",
              "pauseAfterMs": 420
            },
            {
              "id": "t3",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "The rental desk can't hold a van past its listed pickup time today. I'll book the earliest high-roof van we can pick up once the plants are packed.",
              "translationJa": "今日は貸出窓口で、表にある受取時刻を過ぎて車両を取り置きできません。梱包が終わってから受け取れるハイルーフ車のうち、一番早いものを予約します。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Look at the table. Which van will be booked?",
              "translationJa": "表を見てください。どの配送車両が予約されますか。",
              "pauseAfterMs": 450
            }
          ]
        }
      ]
    },
    {
      "part": 4,
      "titleJa": "説明文",
      "sets": [
        {
          "setId": "p4-purpose",
          "part": 4,
          "setting": "共同工房の設備予約案内",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Starting next Monday, members of Nelfern Workshop will be able to reserve time on the laser cutter through our booking page. Open the page, choose a date, and select a thirty-minute slot. The cutter is still only available to members who have completed the safety training. If you used to call the front desk for a reservation, please use the booking page from Monday instead.",
              "translationJa": "来週の月曜日から、ネルファーン工房の会員は予約ページでレーザーカッターの利用時間を予約できるようになります。ページを開き、日付と30分の時間枠を選んでください。利用できるのはこれまでどおり、安全講習を修了した会員に限ります。これまで受付に電話で予約していた方も、月曜日からは予約ページを使ってください。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p4-purpose.mp3",
              "durationMs": 29970,
              "scriptSha256": "742afca89e740810b047df7d1bf21701b8f5ba6b1b690431439326f22a25c0c5",
              "sha256": "064f82d0daaa4a6772fe31bb6bb803907f53d83a43392887cefaae0de9663613",
              "masterSha256": "b5b1e974fdab4de138e9c25776ef02238b15acbfc825509c3bf2419a2b585266"
            }
          },
          "items": [
            {
              "id": "fs1-p4-purpose",
              "skill": "目的・場面",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "To explain the rules for joining a workshop."
                },
                {
                  "id": "B",
                  "text": "To remind members about an upcoming safety class."
                },
                {
                  "id": "C",
                  "text": "To announce changes to front desk hours."
                },
                {
                  "id": "D",
                  "text": "To introduce a new way to reserve equipment."
                }
              ],
              "choiceExplanationsJa": {
                "A": "案内の対象はすでに工房の会員で、入会手続きの説明はありません。",
                "B": "講習は機材を使うための既存の条件です。次回の講習日程は伝えていません。",
                "C": "受付への電話予約を予約ページへ切り替えますが、受付そのものの営業時間は話題にしていません。",
                "D": "月曜からレーザーカッターの利用枠を予約ページで選ぶと案内し、従来の電話予約からの切り替えを告知しています。"
              },
              "translationJa": {
                "choices": {
                  "A": "工房に入会するための規則を説明すること。",
                  "B": "近く開かれる安全講習を会員に思い出してもらうこと。",
                  "C": "受付時間の変更を知らせること。",
                  "D": "設備を予約する新しい方法を紹介すること。"
                },
                "stem": "この案内の主な目的は何ですか。"
              },
              "stem": "What is the main purpose of the announcement?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "月曜からレーザーカッターの利用枠を予約ページで選ぶと案内し、従来の電話予約からの切り替えを告知しています。"
                }
              ],
              "answerId": "D",
              "explanationJa": "月曜からレーザーカッターの利用枠を予約ページで選ぶと案内し、従来の電話予約からの切り替えを告知しています。",
              "vocabulary": [
                {
                  "term": "reserve",
                  "meaningJa": "予約する"
                },
                {
                  "term": "laser cutter",
                  "meaningJa": "レーザーカッター"
                },
                {
                  "term": "slot",
                  "meaningJa": "予約の時間枠"
                },
                {
                  "term": "front desk",
                  "meaningJa": "受付"
                }
              ],
              "number": 13
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Starting next Monday, members of Nelfern Workshop will be able to reserve time on the laser cutter through our booking page. Open the page, choose a date, and select a thirty-minute slot. The cutter is still only available to members who have completed the safety training. If you used to call the front desk for a reservation, please use the booking page from Monday instead.",
              "translationJa": "来週の月曜日から、ネルファーン工房の会員は予約ページでレーザーカッターの利用時間を予約できるようになります。ページを開き、日付と30分の時間枠を選んでください。利用できるのはこれまでどおり、安全講習を修了した会員に限ります。これまで受付に電話で予約していた方も、月曜日からは予約ページを使ってください。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "What is the main purpose of the announcement?",
              "translationJa": "この案内の主な目的は何ですか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p4-detail",
          "part": 4,
          "setting": "館内設備の点検に伴う代替利用の案内",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "This is a message for staff working at Brindle Quay Arts Centre. The staff lift will be out of service from Wednesday through Friday for its annual inspection. The public lift near the ticket office is available for anyone who needs step-free access. Please use the rear staircase when carrying equipment between floors. The side entrance will be open as usual, and our Friday evening programme will start at its regular time.",
              "translationJa": "ブリンドル・キー芸術センターのスタッフにお知らせです。職員用エレベーターは年次点検のため水曜日から金曜日まで使えません。段差のない経路が必要な方は、チケット売り場近くの来館者用エレベーターを利用できます。機材を別の階に運ぶ際は、奥の階段を使ってください。側面の入口は通常どおり開き、金曜日の夜の催しもいつもの時刻に始まります。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p4-detail.mp3",
              "durationMs": 32170,
              "scriptSha256": "d07e0459096d6f9f95e288cf4dcffe394064160dd905172ea99095ba283dd41b",
              "sha256": "c1fa82d5b587bd655a2334f438f608a80a107ba886e4e1e51bc568df4587075e",
              "masterSha256": "56a691507f2fa48d03fda5c824e33f5b4c57fc153a6d51a17506e1135699a10b"
            }
          },
          "items": [
            {
              "id": "fs1-p4-detail",
              "skill": "詳細",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "Near the ticket office."
                },
                {
                  "id": "B",
                  "text": "Beside the rear staircase."
                },
                {
                  "id": "C",
                  "text": "By the side entrance."
                },
                {
                  "id": "D",
                  "text": "Next to the staff lift."
                }
              ],
              "choiceExplanationsJa": {
                "A": "点検期間中に使える来館者用エレベーターは、チケット売り場のそばにあると明示されています。",
                "B": "奥の階段は機材を別の階へ運ぶときに使う経路です。利用可能なエレベーターの位置はチケット売り場を目印に示されています。",
                "C": "側面の入口は通常どおり開くと案内されています。そこが代わりのエレベーターの場所だとは説明していません。",
                "D": "職員用エレベーターは点検対象です。代わりの設備は来館者用で、チケット売り場の近くにあります。"
              },
              "translationJa": {
                "choices": {
                  "A": "チケット売り場の近く。",
                  "B": "奥の階段の横。",
                  "C": "側面の入口の近く。",
                  "D": "職員用エレベーターの隣。"
                },
                "stem": "段差のない経路が必要なスタッフが利用できるエレベーターはどこにありますか。"
              },
              "stem": "Where is the lift that staff can use if they need step-free access?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "点検期間中に使える来館者用エレベーターは、チケット売り場のそばにあると明示されています。"
                }
              ],
              "answerId": "A",
              "explanationJa": "点検期間中に使える来館者用エレベーターは、チケット売り場のそばにあると明示されています。",
              "vocabulary": [
                {
                  "term": "out of service",
                  "meaningJa": "使用停止中で"
                },
                {
                  "term": "annual inspection",
                  "meaningJa": "年次点検"
                },
                {
                  "term": "step-free access",
                  "meaningJa": "段差のないアクセス"
                },
                {
                  "term": "rear staircase",
                  "meaningJa": "奥の階段"
                }
              ],
              "number": 14
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bf_emma",
              "locale": "en-GB",
              "spokenText": "This is a message for staff working at Brindle Quay Arts Centre. The staff lift will be out of service from Wednesday through Friday for its annual inspection. The public lift near the ticket office is available for anyone who needs step-free access. Please use the rear staircase when carrying equipment between floors. The side entrance will be open as usual, and our Friday evening programme will start at its regular time.",
              "translationJa": "ブリンドル・キー芸術センターのスタッフにお知らせです。職員用エレベーターは年次点検のため水曜日から金曜日まで使えません。段差のない経路が必要な方は、チケット売り場近くの来館者用エレベーターを利用できます。機材を別の階に運ぶ際は、奥の階段を使ってください。側面の入口は通常どおり開き、金曜日の夜の催しもいつもの時刻に始まります。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Where is the lift that staff can use if they need step-free access?",
              "translationJa": "段差のない経路が必要なスタッフが利用できるエレベーターはどこにありますか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p4-next",
          "part": 4,
          "setting": "見本市の出展者受付",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Good morning, exhibitors. Once you've picked up your badge here, go to your assigned stand and check that the name on the sign is correct. If the name needs to be changed, bring the sign back here and we'll print a replacement. After you've checked the sign, please collect any display boards you ordered from the storage room. Our staff will then help you set them up.",
              "translationJa": "出展者の皆さま、おはようございます。ここで入場証を受け取ったら、割り当てられたブースに行き、表示板の名前が正しいか確認してください。変更が必要なら表示板をここにお持ちいただければ、代わりのものを印刷します。表示板の確認が済んだら、申し込んだ展示用ボードがあれば備品室で受け取ってください。その後、スタッフが設置をお手伝いします。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p4-next.mp3",
              "durationMs": 28070,
              "scriptSha256": "ec4099ba3e562fd96d120bb0b63c9ef0f2a48f2075392d8d315b200a7ec82669",
              "sha256": "8acc6f753fbbdaa906b71dc8bd1441e4c016c8a26767095f2433348e1b86a040",
              "masterSha256": "c2867cc52e7b39219bc59ed710bb7d0e1a5400afb1b43ed664cc2105be2981de"
            }
          },
          "items": [
            {
              "id": "fs1-p4-next",
              "skill": "次の行動",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "Pick up their display boards."
                },
                {
                  "id": "B",
                  "text": "Ask staff to set up their stands."
                },
                {
                  "id": "C",
                  "text": "Check the signs at their stands."
                },
                {
                  "id": "D",
                  "text": "Request a replacement sign."
                }
              ],
              "choiceExplanationsJa": {
                "A": "ボードを申し込んだ人が備品室へ取りに行くのは、表示板を確認した後です。",
                "B": "スタッフが手伝うのは、表示板を確認し、受け取った展示用ボードを設置するときです。",
                "C": "入場証を受け取ったら、割り当てられたブースへ行き、表示板の名前が正しいか確かめます。",
                "D": "交換の依頼は、表示板を確認して名前に誤りがあった場合にだけ必要です。"
              },
              "translationJa": {
                "choices": {
                  "A": "展示用ボードを受け取る。",
                  "B": "ブースの設置をスタッフに頼む。",
                  "C": "各自のブースで表示板を確認する。",
                  "D": "交換用の表示板を頼む。"
                },
                "stem": "出展者は割り当てられたブースに着いたら何をすべきですか。"
              },
              "stem": "What should exhibitors do when they reach their assigned stands?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "入場証を受け取ったら、割り当てられたブースへ行き、表示板の名前が正しいか確かめます。"
                }
              ],
              "answerId": "C",
              "explanationJa": "入場証を受け取ったら、割り当てられたブースへ行き、表示板の名前が正しいか確かめます。",
              "vocabulary": [
                {
                  "term": "exhibitor",
                  "meaningJa": "出展者"
                },
                {
                  "term": "assigned stand",
                  "meaningJa": "割り当てられたブース"
                },
                {
                  "term": "replacement",
                  "meaningJa": "交換品"
                },
                {
                  "term": "set up",
                  "meaningJa": "設置する"
                }
              ],
              "number": 15
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Good morning, exhibitors. Once you've picked up your badge here, go to your assigned stand and check that the name on the sign is correct. If the name needs to be changed, bring the sign back here and we'll print a replacement. After you've checked the sign, please collect any display boards you ordered from the storage room. Our staff will then help you set them up.",
              "translationJa": "出展者の皆さま、おはようございます。ここで入場証を受け取ったら、割り当てられたブースに行き、表示板の名前が正しいか確認してください。変更が必要なら表示板をここにお持ちいただければ、代わりのものを印刷します。表示板の確認が済んだら、申し込んだ展示用ボードがあれば備品室で受け取ってください。その後、スタッフが設置をお手伝いします。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "What should exhibitors do when they reach their assigned stands?",
              "translationJa": "出展者は割り当てられたブースに着いたら何をすべきですか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p4-intent",
          "part": 4,
          "setting": "ベーカリーの週末向け音声広告",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "This weekend, the apple loaf returns to the counter at Pindrel Bakery. Last Saturday we baked eighty loaves, and by ten only two were left. The first batch went faster than we expected. This Saturday we're baking the same number, but you can now reserve a loaf on our website and pick it up by noon. The loaf contains walnuts, and a full list of ingredients is on the same page.",
              "translationJa": "今週末、ピンドレル・ベーカリーのアップルローフが店頭に戻ります。先週の土曜日は80本を焼きましたが、10時までに残り2本になりました。最初に焼いた分は予想以上の速さで売れました。今週の土曜日も同じ本数を焼きますが、今回はウェブサイトで予約して正午までに受け取れます。クルミを使用しており、同じページで原材料の一覧をご確認いただけます。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "audio": {
              "src": "study/r1/audio/p4-intent.mp3",
              "durationMs": 30920,
              "scriptSha256": "bc3684a92d7c4a49ff8b8c864086450e25df616afc40241dfad6ca340df87dd3",
              "sha256": "7c7f26861bad49fb73ed0057d82ae7bd66f41dfa9cde099e6d739d12e7c5020a",
              "masterSha256": "7d57f3089ffd36d3c2988698422970c94d9b0a649fd9a285df956b4a619f1fe5"
            }
          },
          "items": [
            {
              "id": "fs1-p4-intent",
              "skill": "発言の意図",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "To explain why the bakery is making more loaves this weekend."
                },
                {
                  "id": "B",
                  "text": "To explain why the recipe has changed."
                },
                {
                  "id": "C",
                  "text": "To thank the staff for preparing the loaves quickly."
                },
                {
                  "id": "D",
                  "text": "To encourage customers to reserve a loaf in advance."
                }
              ],
              "choiceExplanationsJa": {
                "A": "今回は先週と同じ本数を焼くと説明しているので、増産の理由ではありません。",
                "B": "クルミと原材料一覧には触れていますが、配合を変更したという説明はありません。",
                "C": "直前では10時の時点で80本中2本しか残っていなかったと述べています。早かったのは製造ではなく商品の売れ行きです。",
                "D": "前回は急速に売れたという事実を伝え、今回は購入分を確保できるウェブ予約を直後に案内しています。"
              },
              "translationJa": {
                "choices": {
                  "A": "今週末は店がより多くの商品を焼く理由を説明するため。",
                  "B": "レシピが変更された理由を説明するため。",
                  "C": "短時間で焼いたスタッフに感謝するため。",
                  "D": "客にアップルローフの事前予約を勧めるため。"
                },
                "stem": "話し手はなぜ「最初に焼いた分は予想以上の速さで売れました」と言っていますか。"
              },
              "stem": "Why does the speaker say, “The first batch went faster than we expected”?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "前回は急速に売れたという事実を伝え、今回は購入分を確保できるウェブ予約を直後に案内しています。"
                }
              ],
              "answerId": "D",
              "explanationJa": "前回は急速に売れたという事実を伝え、今回は購入分を確保できるウェブ予約を直後に案内しています。",
              "vocabulary": [
                {
                  "term": "loaf",
                  "meaningJa": "パンや焼き菓子を型で焼いた1本"
                },
                {
                  "term": "batch",
                  "meaningJa": "一度に作ったひとまとまり"
                },
                {
                  "term": "go fast",
                  "meaningJa": "売れ行きが速い"
                },
                {
                  "term": "ingredient",
                  "meaningJa": "原材料"
                }
              ],
              "number": 16
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "af_heart",
              "locale": "en-US",
              "spokenText": "This weekend, the apple loaf returns to the counter at Pindrel Bakery. Last Saturday we baked eighty loaves, and by ten only two were left. The first batch went faster than we expected. This Saturday we're baking the same number, but you can now reserve a loaf on our website and pick it up by noon. The loaf contains walnuts, and a full list of ingredients is on the same page.",
              "translationJa": "今週末、ピンドレル・ベーカリーのアップルローフが店頭に戻ります。先週の土曜日は80本を焼きましたが、10時までに残り2本になりました。最初に焼いた分は予想以上の速さで売れました。今週の土曜日も同じ本数を焼きますが、今回はウェブサイトで予約して正午までに受け取れます。クルミを使用しており、同じページで原材料の一覧をご確認いただけます。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Why does the speaker say, “The first batch went faster than we expected”?",
              "translationJa": "話し手はなぜ「最初に焼いた分は予想以上の速さで売れました」と言っていますか。",
              "pauseAfterMs": 450
            }
          ]
        },
        {
          "setId": "p4-chart",
          "part": 4,
          "setting": "展示ホール案内ツアーの受付変更",
          "passages": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Attention, guests with tickets for this morning's Textile Room tour. Its usual check-in desk is temporarily closed while staff replace a computer. Please check in at the desk normally assigned to the Ceramics Lab, even if you already have a printed ticket. The Textile Room tour will still leave from its original meeting location, so return there after checking in. The guides will meet you ten minutes before departure.",
              "translationJa": "本日午前の織物室ツアーのチケットをお持ちのお客様にお知らせします。通常の受付ではパソコンの交換作業のため、受付が一時的に停止しています。印刷済みのチケットをお持ちの方も、通常は陶芸工房ツアーに割り当てられている窓口で受付を済ませてください。織物室ツアーは当初の集合場所から出発するので、受付を済ませたらそちらに戻ってください。ガイドは出発の10分前に集合場所でお待ちしています。",
              "pauseAfterMs": 420
            }
          ],
          "media": {
            "table": {
              "id": "table",
              "caption": "Guided tour check-in desks",
              "translationJa": "ガイドツアーの受付",
              "rows": [
                [
                  {
                    "id": "r0c1",
                    "text": "Tour",
                    "translationJa": "ツアー"
                  },
                  {
                    "id": "r0c2",
                    "text": "Check-in desk",
                    "translationJa": "受付"
                  },
                  {
                    "id": "r0c3",
                    "text": "Meeting location",
                    "translationJa": "集合場所"
                  }
                ],
                [
                  {
                    "id": "r1c1",
                    "text": "Print Studio",
                    "translationJa": "版画工房"
                  },
                  {
                    "id": "r1c2",
                    "text": "Desk 1",
                    "translationJa": "第1窓口"
                  },
                  {
                    "id": "r1c3",
                    "text": "North Gallery",
                    "translationJa": "北ギャラリー"
                  }
                ],
                [
                  {
                    "id": "r2c1",
                    "text": "Textile Room",
                    "translationJa": "織物室"
                  },
                  {
                    "id": "r2c2",
                    "text": "Desk 2",
                    "translationJa": "第2窓口"
                  },
                  {
                    "id": "r2c3",
                    "text": "Courtyard",
                    "translationJa": "中庭"
                  }
                ],
                [
                  {
                    "id": "r3c1",
                    "text": "Ceramics Lab",
                    "translationJa": "陶芸工房"
                  },
                  {
                    "id": "r3c2",
                    "text": "Desk 3",
                    "translationJa": "第3窓口"
                  },
                  {
                    "id": "r3c3",
                    "text": "West Lobby",
                    "translationJa": "西ロビー"
                  }
                ],
                [
                  {
                    "id": "r4c1",
                    "text": "Design Archive",
                    "translationJa": "デザイン資料室"
                  },
                  {
                    "id": "r4c2",
                    "text": "Desk 4",
                    "translationJa": "第4窓口"
                  },
                  {
                    "id": "r4c3",
                    "text": "East Lobby",
                    "translationJa": "東ロビー"
                  }
                ]
              ]
            },
            "audio": {
              "src": "study/r1/audio/p4-chart.mp3",
              "durationMs": 38320,
              "scriptSha256": "a2ddff5576c37af5383889940c9801d3201fe3f1b03a4412ac86f772b692443b",
              "sha256": "cd12c40b5e4b3bb70df420ec2cc47f8613b713026c7e69b47895fd1f645cf002",
              "masterSha256": "dc89b09fe1687c8e82eef6078f65cfc1b81b7230fee682c597f3fd613fa3872c"
            }
          },
          "items": [
            {
              "id": "fs1-p4-chart",
              "skill": "図表照合",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "Desk 3."
                },
                {
                  "id": "B",
                  "text": "Desk 1."
                },
                {
                  "id": "C",
                  "text": "Desk 2."
                },
                {
                  "id": "D",
                  "text": "Desk 4."
                }
              ],
              "choiceExplanationsJa": {
                "A": "音声で指定された臨時受付は陶芸工房ツアーの通常窓口です。表のCeramics Labの行にDesk 3とあります。",
                "B": "版画工房ツアーの窓口です。音声で臨時の受付先として指定されたのは陶芸工房ツアーの窓口です。",
                "C": "織物室ツアーの通常の窓口ですが、今朝はパソコン交換で閉鎖されています。",
                "D": "デザイン資料室ツアーの窓口です。変更の案内にこのツアーの窓口は出てきません。"
              },
              "translationJa": {
                "choices": {
                  "A": "第3窓口。",
                  "B": "第1窓口。",
                  "C": "第2窓口。",
                  "D": "第4窓口。"
                },
                "stem": "表を見てください。今朝の織物室ツアーのチケットを持つ客は、どの窓口で受付を済ませるべきですか。"
              },
              "stem": "Look at the table. Where should guests with Textile Room tickets check in this morning?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "r2c2",
                    "r3c1",
                    "r3c2"
                  ],
                  "detailJa": "音声で指定された臨時受付は陶芸工房ツアーの通常窓口です。表のCeramics Labの行にDesk 3とあります。"
                }
              ],
              "answerId": "A",
              "explanationJa": "音声で指定された臨時受付は陶芸工房ツアーの通常窓口です。表のCeramics Labの行にDesk 3とあります。",
              "vocabulary": [
                {
                  "term": "check in",
                  "meaningJa": "受付を済ませる"
                },
                {
                  "term": "temporarily",
                  "meaningJa": "一時的に"
                },
                {
                  "term": "assigned to",
                  "meaningJa": "～に割り当てられた"
                },
                {
                  "term": "departure",
                  "meaningJa": "出発"
                }
              ],
              "number": 17
            }
          ],
          "audioScript": [
            {
              "id": "t1",
              "type": "passage",
              "speakerId": "am_michael",
              "locale": "en-US",
              "spokenText": "Attention, guests with tickets for this morning's Textile Room tour. Its usual check-in desk is temporarily closed while staff replace a computer. Please check in at the desk normally assigned to the Ceramics Lab, even if you already have a printed ticket. The Textile Room tour will still leave from its original meeting location, so return there after checking in. The guides will meet you ten minutes before departure.",
              "translationJa": "本日午前の織物室ツアーのチケットをお持ちのお客様にお知らせします。通常の受付ではパソコンの交換作業のため、受付が一時的に停止しています。印刷済みのチケットをお持ちの方も、通常は陶芸工房ツアーに割り当てられている窓口で受付を済ませてください。織物室ツアーは当初の集合場所から出発するので、受付を済ませたらそちらに戻ってください。ガイドは出発の10分前に集合場所でお待ちしています。",
              "pauseAfterMs": 420
            },
            {
              "id": "question",
              "type": "question",
              "speakerId": "bm_fable",
              "locale": "en-GB",
              "spokenText": "Look at the table. Where should guests with Textile Room tickets check in this morning?",
              "translationJa": "表を見てください。今朝の織物室ツアーのチケットを持つ客は、どの窓口で受付を済ませるべきですか。",
              "pauseAfterMs": 450
            }
          ]
        }
      ]
    },
    {
      "part": 5,
      "titleJa": "短文穴埋め",
      "sets": [
        {
          "setId": "p5-pos",
          "part": 5,
          "setting": "施設の改修費の見積もり",
          "passages": [],
          "media": {},
          "items": [
            {
              "id": "fs1-p5-pos",
              "skill": "品詞",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "reliability"
                },
                {
                  "id": "B",
                  "text": "reliably"
                },
                {
                  "id": "C",
                  "text": "reliable"
                },
                {
                  "id": "D",
                  "text": "rely"
                }
              ],
              "choiceExplanationsJa": {
                "A": "名詞です。the reliability of the estimate なら見積もりの信頼性を表せますが、ここでは estimate を直接修飾して、どんな見積もりかを示す語が必要です。",
                "B": "副詞です。estimate を動詞として使う場合は修飾できますが、ここでは a に続く名詞 estimate を修飾する位置です。",
                "C": "形容詞です。a reliable estimate で「信頼できる見積もり」となり、名詞 estimate がどのようなものかを表します。",
                "D": "動詞の原形です。rely on the estimate なら「その見積もりを頼りにする」と言えますが、冠詞と名詞の間で名詞を修飾する形ではありません。"
              },
              "translationJa": {
                "choices": {
                  "A": "信頼性",
                  "B": "確実に",
                  "C": "信頼できる",
                  "D": "頼る"
                },
                "stem": "改修が始まる前に、施設管理チームには総費用の信頼できる見積もりが必要です。"
              },
              "stem": "Before the renovation begins, the facilities team needs a _____ estimate of the total cost.",
              "evidence": [
                {
                  "refIds": [
                    "stem"
                  ],
                  "detailJa": "形容詞です。a reliable estimate で「信頼できる見積もり」となり、名詞 estimate がどのようなものかを表します。"
                }
              ],
              "answerId": "C",
              "explanationJa": "形容詞です。a reliable estimate で「信頼できる見積もり」となり、名詞 estimate がどのようなものかを表します。",
              "vocabulary": [
                {
                  "term": "renovation",
                  "meaningJa": "改修"
                },
                {
                  "term": "facilities team",
                  "meaningJa": "施設管理チーム"
                },
                {
                  "term": "reliable estimate",
                  "meaningJa": "信頼できる見積もり"
                },
                {
                  "term": "total cost",
                  "meaningJa": "総費用"
                }
              ],
              "number": 18
            }
          ]
        },
        {
          "setId": "p5-verb",
          "part": 5,
          "setting": "支店から届いた在庫数の確認",
          "passages": [],
          "media": {},
          "items": [
            {
              "id": "fs1-p5-verb",
              "skill": "動詞の形",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "verifies"
                },
                {
                  "id": "B",
                  "text": "verifying"
                },
                {
                  "id": "C",
                  "text": "verify"
                },
                {
                  "id": "D",
                  "text": "verified"
                }
              ],
              "choiceExplanationsJa": {
                "A": "The team verifies the figures. のように単独で現在の述語になります。has not に続いて現在完了を作る形ではありません。",
                "B": "is verifying なら進行中を表します。本文の has not と組み合わせるには、現在完了進行形なら been が必要です。",
                "C": "did not verify のように do の過去形の後なら使えます。ここにある助動詞は has です。",
                "D": "has not verified で現在完了の否定になります。yet と合わせ、現時点まで確認が済んでいないことを示します。"
              },
              "translationJa": {
                "choices": {
                  "A": "確認する（三人称単数現在形）",
                  "B": "確認している（-ing形）",
                  "C": "確認する（原形）",
                  "D": "確認した（過去分詞）"
                },
                "stem": "在庫管理チームは支店から届いた数値をまだ確認していません。"
              },
              "stem": "The inventory team has not _____ the figures from the branch office yet.",
              "evidence": [
                {
                  "refIds": [
                    "stem"
                  ],
                  "detailJa": "has not verified で現在完了の否定になります。yet と合わせ、現時点まで確認が済んでいないことを示します。"
                }
              ],
              "answerId": "D",
              "explanationJa": "has not verified で現在完了の否定になります。yet と合わせ、現時点まで確認が済んでいないことを示します。",
              "vocabulary": [
                {
                  "term": "inventory team",
                  "meaningJa": "在庫管理チーム"
                },
                {
                  "term": "verify figures",
                  "meaningJa": "数値を確認する"
                },
                {
                  "term": "branch office",
                  "meaningJa": "支店"
                },
                {
                  "term": "not yet",
                  "meaningJa": "まだ～していない"
                }
              ],
              "number": 19
            }
          ]
        },
        {
          "setId": "p5-connector",
          "part": 5,
          "setting": "式典の座席表の印刷",
          "passages": [],
          "media": {},
          "items": [
            {
              "id": "fs1-p5-connector",
              "skill": "接続詞と前置詞",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "so that"
                },
                {
                  "id": "B",
                  "text": "despite"
                },
                {
                  "id": "C",
                  "text": "because of"
                },
                {
                  "id": "D",
                  "text": "during"
                }
              ],
              "choiceExplanationsJa": {
                "A": "目的を表す接続表現です。the print shop が主語、can make が述語の節を導き、木曜日までに送る目的を示します。",
                "B": "despite a delay のように名詞句を取る前置詞です。ここでは後ろに節が続き、送付と印刷の関係も逆接ではなく目的です。",
                "C": "前置詞句です。because of the Friday schedule のように名詞句を取りますが、ここでは主語と述語を持つ節が続きます。",
                "D": "時を表す前置詞です。during business hours のように時を表す名詞句を取り、印刷店が複製できるという節を直接導きません。"
              },
              "translationJa": {
                "choices": {
                  "A": "～できるように",
                  "B": "～にもかかわらず",
                  "C": "～のために、～が理由で",
                  "D": "～の間に"
                },
                "stem": "印刷店が金曜日に複製できるよう、更新した座席表を木曜日までに送ってください。"
              },
              "stem": "Please send the updated seating chart by Thursday _____ the print shop can make copies on Friday.",
              "evidence": [
                {
                  "refIds": [
                    "stem"
                  ],
                  "detailJa": "目的を表す接続表現です。the print shop が主語、can make が述語の節を導き、木曜日までに送る目的を示します。"
                }
              ],
              "answerId": "A",
              "explanationJa": "目的を表す接続表現です。the print shop が主語、can make が述語の節を導き、木曜日までに送る目的を示します。",
              "vocabulary": [
                {
                  "term": "seating chart",
                  "meaningJa": "座席表"
                },
                {
                  "term": "by Thursday",
                  "meaningJa": "木曜日までに"
                },
                {
                  "term": "print shop",
                  "meaningJa": "印刷店"
                },
                {
                  "term": "make copies",
                  "meaningJa": "複製する"
                }
              ],
              "number": 20
            }
          ]
        },
        {
          "setId": "p5-vocab",
          "part": 5,
          "setting": "承認済み出張の交通費精算",
          "passages": [],
          "media": {},
          "items": [
            {
              "id": "fs1-p5-vocab",
              "skill": "語彙と文脈",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "confirm"
                },
                {
                  "id": "B",
                  "text": "reimburse"
                },
                {
                  "id": "C",
                  "text": "reserve"
                },
                {
                  "id": "D",
                  "text": "charge"
                }
              ],
              "choiceExplanationsJa": {
                "A": "confirm the fares なら運賃を確認する意味になります。この位置では employees が目的語で、立て替えた運賃を会社が返す行為が必要です。",
                "B": "reimburse A for B で「Bの費用をAに払い戻す」となり、領収書を提出した従業員に列車運賃を返す手続きに合います。",
                "C": "reserve seats なら座席を確保する意味です。ここではすでに従業員が支払った運賃について、領収書の提出後にする手続きを述べています。",
                "D": "charge A for B は「Bの料金をAに請求する」です。従業員に運賃を追加請求することになり、承認済み出張の立て替え精算とはお金の流れが逆です。"
              },
              "translationJa": {
                "choices": {
                  "A": "確認する",
                  "B": "払い戻す、立て替え費用を返す",
                  "C": "予約する、取り置く",
                  "D": "請求する"
                },
                "stem": "承認済みの出張については、従業員が領収書を提出すれば、立て替えた列車運賃を会社が払い戻します。"
              },
              "stem": "For approved trips, the company will _____ employees for the train fares they paid out of pocket once they submit their receipts.",
              "evidence": [
                {
                  "refIds": [
                    "stem"
                  ],
                  "detailJa": "reimburse A for B で「Bの費用をAに払い戻す」となり、領収書を提出した従業員に列車運賃を返す手続きに合います。"
                }
              ],
              "answerId": "B",
              "explanationJa": "reimburse A for B で「Bの費用をAに払い戻す」となり、領収書を提出した従業員に列車運賃を返す手続きに合います。",
              "vocabulary": [
                {
                  "term": "reimburse A for B",
                  "meaningJa": "Bの費用をAに払い戻す"
                },
                {
                  "term": "documented",
                  "meaningJa": "証明書類のある"
                },
                {
                  "term": "train fare",
                  "meaningJa": "列車運賃"
                },
                {
                  "term": "submit a receipt",
                  "meaningJa": "領収書を提出する"
                }
              ],
              "number": 21
            }
          ]
        }
      ]
    },
    {
      "part": 6,
      "titleJa": "長文穴埋め",
      "sets": [
        {
          "setId": "p6-word",
          "part": 6,
          "setting": "地域交流施設の貸出窓口移転",
          "passages": [
            {
              "id": "t1",
              "text": "Equipment Pickup Notice\nFrom Monday, members should collect reserved equipment at the temporary counter in the west lobby. When you arrive, please _____ a photo ID to the attendant. Staff will compare the name on the ID with the name on your reservation before handing over the equipment.",
              "translationJa": "備品受取のお知らせ\n月曜日から、会員は西ロビーの仮設カウンターで予約した備品を受け取ってください。お越しの際は、係員に顔写真付き身分証を提示してください。スタッフは備品を渡す前に、身分証の氏名と予約の氏名が一致しているか確認します。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p6-word",
              "skill": "語句補充",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "present"
                },
                {
                  "id": "B",
                  "text": "replace"
                },
                {
                  "id": "C",
                  "text": "renew"
                },
                {
                  "id": "D",
                  "text": "attach"
                }
              ],
              "choiceExplanationsJa": {
                "A": "present A to B で「AをBに提示する」となります。次の文の照合には、受け取りに来た人が係員に身分証を見せる必要があります。",
                "B": "交換なら replace A with B の形で代わりの物を示します。窓口で必要なのは手持ちの身分証の提示です。",
                "C": "身分証の有効期間を延ばす動作です。係員は予約名を確認するために身分証を見ており、身分証の更新を受け付けているわけではありません。",
                "D": "attach A to B では、Bが添付先になります。ここで to の後に続くのは係員という人で、身分証を添付する文書ではありません。"
              },
              "translationJa": {
                "choices": {
                  "A": "提示する",
                  "B": "交換する",
                  "C": "更新する",
                  "D": "添付する、取り付ける"
                },
                "stem": "お知らせの空所に最もよく合う単語はどれですか。"
              },
              "stem": "Which word best completes the notice?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "present A to B で「AをBに提示する」となります。次の文の照合には、受け取りに来た人が係員に身分証を見せる必要があります。"
                }
              ],
              "answerId": "A",
              "explanationJa": "present A to B で「AをBに提示する」となります。次の文の照合には、受け取りに来た人が係員に身分証を見せる必要があります。",
              "vocabulary": [
                {
                  "term": "temporary counter",
                  "meaningJa": "仮設カウンター"
                },
                {
                  "term": "photo ID",
                  "meaningJa": "顔写真付き身分証"
                },
                {
                  "term": "compare A with B",
                  "meaningJa": "AをBと照合する"
                },
                {
                  "term": "hand over",
                  "meaningJa": "引き渡す"
                }
              ],
              "number": 22
            }
          ]
        },
        {
          "setId": "p6-cohesion",
          "part": 6,
          "setting": "配送用木箱の一時的な返却先",
          "passages": [
            {
              "id": "t1",
              "text": "Message to Warehouse Staff\nThe return bins beside the loading dock are full. _____, please leave all empty crates at the service desk until noon. Our driver will collect the crates from the desk at lunchtime.",
              "translationJa": "倉庫スタッフへの連絡\n搬入口の脇にある回収箱はいっぱいです。そのため、正午までは空の木箱をすべてサービス窓口に置いてください。昼休みに運転手が窓口から木箱を回収します。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p6-cohesion",
              "skill": "文脈・つながり",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "For instance"
                },
                {
                  "id": "B",
                  "text": "Even so"
                },
                {
                  "id": "C",
                  "text": "In contrast"
                },
                {
                  "id": "D",
                  "text": "Therefore"
                }
              ],
              "choiceExplanationsJa": {
                "A": "直前の主張を具体例で示す表現です。窓口に木箱を置く指示は、回収箱がいっぱいであることの例ではなく、それを受けた対応です。",
                "B": "直前の事情があっても予想に反する行動を取るときの表現です。別の場所を使う指示は、回収箱が満杯であることの自然な結果です。",
                "C": "二つのものの違いを比べる表現です。ここでは回収箱と窓口の特徴を対比するより、問題に対する措置を伝えています。",
                "D": "原因から結果を導きます。回収箱が満杯という理由に続け、空の木箱を窓口に集める措置を示しています。"
              },
              "translationJa": {
                "choices": {
                  "A": "例えば",
                  "B": "そうであっても",
                  "C": "対照的に",
                  "D": "したがって、そのため"
                },
                "stem": "最初の2文を最も適切につなぐ表現はどれですか。"
              },
              "stem": "Which transition best connects the first two sentences?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "原因から結果を導きます。回収箱が満杯という理由に続け、空の木箱を窓口に集める措置を示しています。"
                }
              ],
              "answerId": "D",
              "explanationJa": "原因から結果を導きます。回収箱が満杯という理由に続け、空の木箱を窓口に集める措置を示しています。",
              "vocabulary": [
                {
                  "term": "return bin",
                  "meaningJa": "回収箱"
                },
                {
                  "term": "loading dock",
                  "meaningJa": "搬入口"
                },
                {
                  "term": "empty crate",
                  "meaningJa": "空の木箱"
                },
                {
                  "term": "collect",
                  "meaningJa": "回収する"
                }
              ],
              "number": 23
            }
          ]
        },
        {
          "setId": "p6-sentence",
          "part": 6,
          "setting": "見本市の実演台と電源",
          "passages": [
            {
              "id": "t1",
              "text": "Subject: Demonstration table at the Elmspindle Materials Fair\nYour team has reserved a demonstration table at the fair. Due to a change in the layout, the table no longer has a power outlet nearby. _____ We can then arrange for a table near an outlet before we finalize the floor plan.",
              "translationJa": "件名：エルムスピンドル素材見本市の実演台\n皆さまのチームは見本市の実演台を予約しています。配置が変更され、予約した実演台の近くにはコンセントがなくなりました。実演に電源が必要な場合は、水曜日までにお知らせください。そうすれば、会場図を確定する前にコンセントの近くの実演台を手配できます。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p6-sentence",
              "skill": "文挿入",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "All table assignments were finalized last Friday."
                },
                {
                  "id": "B",
                  "text": "Printed programs can be collected at the entrance."
                },
                {
                  "id": "C",
                  "text": "If your demonstration requires electricity, please let us know by Wednesday."
                },
                {
                  "id": "D",
                  "text": "Please tell us if you would like a second name badge."
                }
              ],
              "choiceExplanationsJa": {
                "A": "すでにすべて確定したという内容で、直後の「会場図を確定する前に手配できる」という今後の対応につながりません。",
                "B": "受け取り場所の説明で、直前の電源の問題を解消できません。直後の We can then が受ける行動も示されていません。",
                "C": "コンセントを使う必要がある出展者に連絡を求めます。その連絡が We can then の前提になり、電源の近くに実演台を手配できます。",
                "D": "名札の追加とコンセントの近くの実演台の手配は結び付きません。知らせてほしいのは、電源を使うかどうかです。"
              },
              "translationJa": {
                "choices": {
                  "A": "実演台の割り当てはすべて先週の金曜日に確定しました。",
                  "B": "印刷したプログラムは入口で受け取れます。",
                  "C": "実演に電源が必要な場合は、水曜日までにお知らせください。",
                  "D": "名札がもう1枚必要な場合は、お知らせください。"
                },
                "stem": "空所に最もよく入る文はどれですか。"
              },
              "stem": "Which sentence best fits in the blank?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "コンセントを使う必要がある出展者に連絡を求めます。その連絡が We can then の前提になり、電源の近くに実演台を手配できます。"
                }
              ],
              "answerId": "C",
              "explanationJa": "コンセントを使う必要がある出展者に連絡を求めます。その連絡が We can then の前提になり、電源の近くに実演台を手配できます。",
              "vocabulary": [
                {
                  "term": "demonstration table",
                  "meaningJa": "実演台"
                },
                {
                  "term": "layout",
                  "meaningJa": "配置"
                },
                {
                  "term": "power outlet",
                  "meaningJa": "コンセント"
                },
                {
                  "term": "finalize the floor plan",
                  "meaningJa": "会場図を確定する"
                }
              ],
              "number": 24
            }
          ]
        }
      ]
    },
    {
      "part": 7,
      "titleJa": "読解",
      "sets": [
        {
          "setId": "p7-purpose",
          "part": 7,
          "setting": "地域工房の部屋利用変更",
          "passages": [
            {
              "id": "t1",
              "text": "Notice to members of Bracken Loom Workshop\nThe sewing room will close from June 10 through June 12 while its ventilation system is replaced. Members with bookings during that period may use the craft room across the hall at their original times. The equipment needed for each session will be moved there in advance. The sewing room will reopen on June 13.",
              "translationJa": "ブラッケン・ルーム工房の会員へのお知らせ\n換気設備を交換するため、6月10日から12日まで裁縫室を閉鎖します。この期間に予約がある会員は、廊下の向かいにある工作室を当初の予約時刻に利用できます。各回に必要な道具は事前に工作室へ移しておきます。裁縫室は6月13日に再開します。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p7-purpose",
              "skill": "目的・要旨",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "To announce new equipment that members can borrow"
                },
                {
                  "id": "B",
                  "text": "To explain a temporary change of room for existing bookings"
                },
                {
                  "id": "C",
                  "text": "To ask members to reschedule their sessions online"
                },
                {
                  "id": "D",
                  "text": "To invite members to a June 13 workshop"
                }
              ],
              "choiceExplanationsJa": {
                "A": "交換するのは部屋の換気設備です。各回で使う道具は移動させるだけで、新たに貸し出す道具は紹介されていません。",
                "B": "裁縫室が閉鎖される期間、予約時刻はそのままで工作室を使えると伝えています。閉鎖期間、代替場所、再開日がすべてこの目的に関わります。",
                "C": "利用時刻は当初の予約どおりです。会員にオンラインで変更してもらう手続きはありません。",
                "D": "6月13日は裁縫室の再開日です。その日に開く講習会への招待ではありません。"
              },
              "translationJa": {
                "choices": {
                  "A": "会員が借りられる新しい道具を知らせるため。",
                  "B": "予約済みの利用者に、一時的な会場変更を知らせるため。",
                  "C": "会員にオンラインで予約時刻の変更を依頼するため。",
                  "D": "会員を6月13日の講習会に招くため。"
                },
                "stem": "このお知らせの主な目的は何ですか。"
              },
              "stem": "What is the main purpose of the notice?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "裁縫室が閉鎖される期間、予約時刻はそのままで工作室を使えると伝えています。閉鎖期間、代替場所、再開日がすべてこの目的に関わります。"
                }
              ],
              "answerId": "B",
              "explanationJa": "裁縫室が閉鎖される期間、予約時刻はそのままで工作室を使えると伝えています。閉鎖期間、代替場所、再開日がすべてこの目的に関わります。",
              "vocabulary": [
                {
                  "term": "ventilation system",
                  "meaningJa": "換気設備"
                },
                {
                  "term": "during that period",
                  "meaningJa": "その期間中"
                },
                {
                  "term": "at their original times",
                  "meaningJa": "当初の予約時刻に"
                },
                {
                  "term": "in advance",
                  "meaningJa": "事前に"
                }
              ],
              "number": 25
            }
          ]
        },
        {
          "setId": "p7-detail",
          "part": 7,
          "setting": "屋外研修の貸出無線機",
          "passages": [
            {
              "id": "t1",
              "text": "Marshvale Trail Volunteer Weekend\nPlease register at the visitor center when you arrive on Saturday. If you need a radio, collect one from the guide tent before your session. Maps are available in the supply shed. Return radios to the box beside the east gate by five on Sunday, even if you leave before the final session.",
              "translationJa": "マーシュヴェイル遊歩道の週末ボランティア活動\n土曜日に到着したらビジターセンターで受付を済ませてください。無線機が必要な場合は、担当回が始まる前にガイド用テントで受け取ってください。地図は備品小屋にあります。最終回の前に帰る場合も、日曜日5時までに東門脇の箱へ無線機を返却してください。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p7-detail",
              "skill": "詳細",
              "difficulty": "easy",
              "choices": [
                {
                  "id": "A",
                  "text": "Beside the east gate"
                },
                {
                  "id": "B",
                  "text": "At the guide tent"
                },
                {
                  "id": "C",
                  "text": "In the supply shed"
                },
                {
                  "id": "D",
                  "text": "At the visitor center"
                }
              ],
              "choiceExplanationsJa": {
                "A": "Return radios に続く場所が the box beside the east gate です。東門脇の箱が返却先です。",
                "B": "担当回の前に無線機を受け取る場所です。返却場所を聞いている点に注意します。",
                "C": "ここに置かれているのは地図です。無線機の返却先とは別です。",
                "D": "土曜日に到着した際に受付をする場所です。無線機を返す場所として案内されていません。"
              },
              "translationJa": {
                "choices": {
                  "A": "東門の脇。",
                  "B": "ガイド用テント。",
                  "C": "備品小屋。",
                  "D": "ビジターセンター。"
                },
                "stem": "ボランティアは無線機をどこに返却するべきですか。"
              },
              "stem": "Where should volunteers return their radios?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "Return radios に続く場所が the box beside the east gate です。東門脇の箱が返却先です。"
                }
              ],
              "answerId": "A",
              "explanationJa": "Return radios に続く場所が the box beside the east gate です。東門脇の箱が返却先です。",
              "vocabulary": [
                {
                  "term": "collect a radio",
                  "meaningJa": "無線機を受け取る"
                },
                {
                  "term": "supply shed",
                  "meaningJa": "備品小屋"
                },
                {
                  "term": "beside",
                  "meaningJa": "～の脇に"
                },
                {
                  "term": "even if",
                  "meaningJa": "たとえ～でも"
                }
              ],
              "number": 26
            }
          ]
        },
        {
          "setId": "p7-inference",
          "part": 7,
          "setting": "収録順と帰りのバスを相談するチャット",
          "passages": [
            {
              "id": "t1",
              "text": "Rena: I can get to the studio at two, before we start recording. The last bus back to Kiteford leaves at five, though.\nMilo: Let's put your interview in the first block, then. We'll record the closing discussion after the other guests arrive at five thirty.\nRena: Thanks. I'll take the bus back right after my interview.",
              "translationJa": "レナ：収録の開始前、2時にはスタジオに着けます。ただ、カイトフォード行きの最終バスは5時に出るんです。\nミロ：それなら、あなたのインタビューは最初の枠に入れましょう。締めくくりの座談会は、ほかの出演者が5時半に到着してから収録します。\nレナ：ありがとうございます。インタビューが終わったらすぐにバスで帰ります。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p7-inference",
              "skill": "推論",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "She will arrive after recording begins."
                },
                {
                  "id": "B",
                  "text": "She will drive back to Kiteford."
                },
                {
                  "id": "C",
                  "text": "She will be interviewed after the other guests arrive."
                },
                {
                  "id": "D",
                  "text": "She will miss the closing discussion."
                }
              ],
              "choiceExplanationsJa": {
                "A": "本人は before we start recording と述べており、収録前に到着する予定です。",
                "B": "本人が帰りにバスに乗ると言っており、運転して帰るとは読み取れません。",
                "C": "ほかの出演者の到着は5時半です。レナは5時までにバスに乗るため、先に最初の枠で収録します。",
                "D": "レナはインタビュー後、5時発の最終バスで帰るつもりです。座談会は5時半以降なので、参加できないと推測できます。"
              },
              "translationJa": {
                "choices": {
                  "A": "収録が始まった後に到着する。",
                  "B": "カイトフォードまで車を運転して帰る。",
                  "C": "ほかの出演者が到着してからインタビューを受ける。",
                  "D": "締めくくりの座談会には参加できない。"
                },
                "stem": "レナについて何が推測できますか。"
              },
              "stem": "What is implied about Rena?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "レナはインタビュー後、5時発の最終バスで帰るつもりです。座談会は5時半以降なので、参加できないと推測できます。"
                }
              ],
              "answerId": "D",
              "explanationJa": "レナはインタビュー後、5時発の最終バスで帰るつもりです。座談会は5時半以降なので、参加できないと推測できます。",
              "vocabulary": [
                {
                  "term": "last bus",
                  "meaningJa": "最終バス"
                },
                {
                  "term": "first block",
                  "meaningJa": "最初の収録枠"
                },
                {
                  "term": "closing discussion",
                  "meaningJa": "締めくくりの座談会"
                },
                {
                  "term": "right after",
                  "meaningJa": "～の直後に"
                }
              ],
              "number": 27
            }
          ]
        },
        {
          "setId": "p7-cross",
          "part": 7,
          "setting": "大型の額縁の受け取りと停留所別の日程",
          "passages": [
            {
              "id": "t1",
              "text": "Vellumreach Local Delivery\nPickup stops: Alder Square is served on Tuesdays and Thursdays. Birch Lane is served on Wednesdays and Fridays. Parcels marked Oversize can be collected only on Thursday and Friday services. All services arrive at the pickup stops at four in the afternoon.",
              "translationJa": "ヴェラムリーチ地域配送\n受取停留所：アルダー広場は火曜日と木曜日、バーチ通りは水曜日と金曜日に運行します。「大型」と表示された荷物は木曜日と金曜日の便でのみ受け取れます。どの便も受取停留所には午後4時に到着します。",
              "type": "document"
            },
            {
              "id": "t2",
              "text": "From: Nela\nTo: Aven\nSubject: Picking up the frames\nThe shop confirmed that our two picture frames are marked Oversize. I can meet the delivery driver at Birch Lane, since it is next to my workplace. I'll collect both frames there this week.",
              "translationJa": "差出人：ネラ\n宛先：エイヴン\n件名：額縁の受け取り\n注文した額縁2点には「大型」と表示されていると店が確認しました。バーチ通りは職場の隣なので、そこで配送の運転手と会えます。今週、そこで額縁を2点とも受け取ります。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p7-cross",
              "skill": "複数文書照合",
              "difficulty": "hard",
              "choices": [
                {
                  "id": "A",
                  "text": "Thursday"
                },
                {
                  "id": "B",
                  "text": "Friday"
                },
                {
                  "id": "C",
                  "text": "Tuesday"
                },
                {
                  "id": "D",
                  "text": "Wednesday"
                }
              ],
              "choiceExplanationsJa": {
                "A": "大型荷物を扱う曜日ですが、木曜日の便はアルダー広場に行きます。ネラが受け取る予定のバーチ通りには停車しません。",
                "B": "メールで額縁が大型荷物であり、受け取りはバーチ通りと分かります。案内で「バーチ通りの水・金」と「大型を扱う木・金」を照合すると、両方を満たすのは金曜日です。",
                "C": "火曜日の停留所はアルダー広場です。大型荷物も火曜日には受け取れません。",
                "D": "バーチ通りに停車する曜日ですが、大型荷物を扱うのは木曜日と金曜日に限られます。"
              },
              "translationJa": {
                "choices": {
                  "A": "木曜日。",
                  "B": "金曜日。",
                  "C": "火曜日。",
                  "D": "水曜日。"
                },
                "stem": "ネラは予定どおりなら何曜日に額縁を受け取れますか。"
              },
              "stem": "On which day can Nela collect the frames as planned?",
              "evidence": [
                {
                  "refIds": [
                    "t1",
                    "t2"
                  ],
                  "detailJa": "メールで額縁が大型荷物であり、受け取りはバーチ通りと分かります。案内で「バーチ通りの水・金」と「大型を扱う木・金」を照合すると、両方を満たすのは金曜日です。"
                }
              ],
              "answerId": "B",
              "explanationJa": "メールで額縁が大型荷物であり、受け取りはバーチ通りと分かります。案内で「バーチ通りの水・金」と「大型を扱う木・金」を照合すると、両方を満たすのは金曜日です。",
              "vocabulary": [
                {
                  "term": "pickup stop",
                  "meaningJa": "荷物の受取停留所"
                },
                {
                  "term": "oversize",
                  "meaningJa": "大型扱いの"
                },
                {
                  "term": "parcel",
                  "meaningJa": "小包、配送荷物"
                },
                {
                  "term": "picture frame",
                  "meaningJa": "額縁"
                }
              ],
              "number": 28
            }
          ]
        },
        {
          "setId": "p7-sentence",
          "part": 7,
          "setting": "ロッカー予約手順の文の位置",
          "passages": [
            {
              "id": "t1",
              "text": "Starting Monday, members can reserve a locker for one day at a time. [1] To reserve one, open the member portal. [2] Enter your email address and select the date you need. [3] Use that code to open the locker when you arrive. [4] Please empty the locker before the building closes.",
              "translationJa": "月曜日から、会員は1日単位でロッカーを予約できます。[1] 予約するには、会員向けポータルを開いてください。[2] メールアドレスを入力し、利用希望日を選んでください。[3] 到着したら、その暗証番号を使ってロッカーを開けてください。[4] 建物の閉館前にロッカーを空にしてください。",
              "type": "document"
            }
          ],
          "media": {},
          "items": [
            {
              "id": "fs1-p7-sentence",
              "skill": "文挿入",
              "difficulty": "medium",
              "choices": [
                {
                  "id": "A",
                  "text": "[1]"
                },
                {
                  "id": "B",
                  "text": "[2]"
                },
                {
                  "id": "C",
                  "text": "[3]"
                },
                {
                  "id": "D",
                  "text": "[4]"
                }
              ],
              "choiceExplanationsJa": {
                "A": "この位置ではメールアドレスを入力する手順がまだ説明されていません。then が示す送信前の操作とメールアドレスの提示が後に来てしまいます。",
                "B": "会員向けポータルを開くだけでは送信先が指定されません。次の文でメールアドレスと利用日を入力してから送信する順序です。",
                "C": "メールアドレスを入力した直後なので then が手順を自然につなぎます。また、挿入文の the access code が、次の文の that code の指すものになります。",
                "D": "この位置では that code が暗証番号の説明より先に登場します。番号を受け取ってからロッカーを開けるという手順にも合いません。"
              },
              "translationJa": {
                "choices": {
                  "A": "[1]の位置。",
                  "B": "[2]の位置。",
                  "C": "[3]の位置。",
                  "D": "[4]の位置。"
                },
                "stem": "「その後、入力したメールアドレスに暗証番号が自動送信されます」という文は、どこに入れるのが最も適切ですか。"
              },
              "stem": "Where would the sentence “The access code will then be sent automatically to the email address you provide.” best fit?",
              "evidence": [
                {
                  "refIds": [
                    "t1"
                  ],
                  "detailJa": "メールアドレスを入力した直後なので then が手順を自然につなぎます。また、挿入文の the access code が、次の文の that code の指すものになります。"
                }
              ],
              "answerId": "C",
              "explanationJa": "メールアドレスを入力した直後なので then が手順を自然につなぎます。また、挿入文の the access code が、次の文の that code の指すものになります。",
              "vocabulary": [
                {
                  "term": "one day at a time",
                  "meaningJa": "一度に1日ずつ、1日単位で"
                },
                {
                  "term": "member portal",
                  "meaningJa": "会員向けポータル"
                },
                {
                  "term": "access code",
                  "meaningJa": "解錠用の暗証番号"
                },
                {
                  "term": "empty a locker",
                  "meaningJa": "ロッカーを空にする"
                }
              ],
              "number": 29
            }
          ]
        }
      ]
    }
  ],
  "production": {
    "model": "onnx-community/Kokoro-82M-v1.0-ONNX",
    "revision": "1939ad2a8e416c0acfeecc08a694d14ef25f2231",
    "modelSha256": "fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478",
    "voiceSha256": {
      "af_heart": "d583ccff3cdca2f7fae535cb998ac07e9fcb90f09737b9a41fa2734ec44a8f0b",
      "am_michael": "1d1f21dd8da39c30705cd4c75d039d265e9bc4a2a93ed09bc9e1b1225eb95ba1",
      "bf_emma": "669fe0647f9dd04fcab92f1439a40eeb4c8b4ab1f82e4996fe3d918ce4a63b73",
      "bm_fable": "f889083196807b4adb15e9204252165f503b8d33d3982e681c52443c49d798f1"
    },
    "sampleRateHz": 24000,
    "speed": 0.97,
    "dependencies": {
      "kokoro-onnx": "0.5.0",
      "onnxruntime": "1.32.0",
      "numpy": "2.5.5",
      "espeakng-loader": "0.2.4",
      "phonemizer-fork": "3.3.2"
    },
    "ffmpeg": "ffmpeg version 8.0-full_build-www.gyan.dev Copyright (c) 2000-2025 the FFmpeg developers"
  }
};
