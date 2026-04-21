module.exports = { REPERTOIRE: [
  {
    "category": "Contre 1...e5",
    "name": "Ligne principale ...e5 ...d6",
    "moves": [
      {
        "san": "b4",
        "comment": "<em>L'Ouverture Polonaise (Sokolsky).</em> Coup surprise qui gagne de l'espace à l'aile dame. <strong>Idée :</strong> déployer Fb2 pour viser la grande diagonale a1-h8.",
        "arrows": [
          {
            "from": "b2",
            "to": "b4",
            "color": "green"
          },
          {
            "from": "c1",
            "to": "b2",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "b4",
            "color": "green"
          },
          {
            "square": "h8",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e5",
        "comment": "La réponse la plus combative. Noir <strong>défie b4</strong> (le pion est attaqué) et revendique le centre. La diagonale a1-h8 est maintenant bouchée par ...e5, il faudra la dégager.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "e5",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bb2",
        "comment": "<em>Coup clé du système.</em> Le fou attaque le pion e5 et défend indirectement b4 (si ...Fxb4, on joue Fxe5). <strong>Attention :</strong> le pion e5 est cloué tactiquement !",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "b2",
            "color": "green"
          },
          {
            "square": "e5",
            "color": "red"
          }
        ]
      },
      {
        "san": "d6",
        "comment": "Noir défend e5 solidement. Structure <strong>Philidor renversée</strong>. Le pion d6 bloque le fou noir f8, ce qui nous donne le temps de développer calmement.",
        "arrows": [
          {
            "from": "d6",
            "to": "e5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": "Modeste mais essentiel. Ouvre la diagonale du fou f1 (vers e2/c4/b5) et prépare Cf3. <strong>Plan :</strong> c4, Fe2, roque, Cc3.",
        "arrows": [
          {
            "from": "f1",
            "to": "e2",
            "color": "yellow"
          },
          {
            "from": "g1",
            "to": "f3",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Nf6",
        "comment": "Développement naturel. Le cavalier contrôle e4 et d5.",
        "circles": [
          {
            "square": "e4",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "c4",
        "comment": "<em>Setup anti-d6.</em> On prend l'espace à l'aile dame. <strong>Important :</strong> dans cette ligne avec ...d6, on ne joue PAS a3 — on développe directement c4 + Cc3.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "d5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": "Noir prépare le roque. Coup passif mais solide."
      },
      {
        "san": "Be2",
        "comment": "Développement calme. On évite Fd3 car le fou serait mal placé (bloque d-pion). <strong>Prochain coup :</strong> 0-0 puis Cc3.",
        "arrows": [
          {
            "from": "f1",
            "to": "e2",
            "color": "green"
          }
        ]
      },
      {
        "san": "O-O",
        "comment": "Noir roque. Position symétrique mais nous avons plus d'espace à l'aile dame."
      },
      {
        "san": "Nc3",
        "comment": "<em>Position cible atteinte !</em> <strong>Plans futurs :</strong><br>• <span style='color:#81b64c'>Cf3 puis 0-0</span> (développement)<br>• <span style='color:#e8a33d'>d4</span> pour dominer le centre<br>• <span style='color:#e8a33d'>a4-a5</span> pour grignoter à l'aile dame",
        "arrows": [
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          },
          {
            "from": "a2",
            "to": "a4",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "d4",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...e5",
    "name": "Piège : 2...Fxb4 ?? 3.Fxe5 !",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": "Le fou cloue e5. Si Noir prend b4 sans défendre e5, on gagne un pion.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bxb4",
        "comment": "<em>Erreur typique des débutants !</em> Noir prend le pion b4, gourmand, mais oublie que son pion e5 reste sans défense.",
        "circles": [
          {
            "square": "e5",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bxe5",
        "comment": "<em>🎯 GAIN DE PION !</em> Voici le <strong>pincement caractéristique du Sokolsky</strong>. Le fou noir b4 est aussi exposé — on va le chasser avec Cf3, a3, ou c3.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "e5",
            "color": "green"
          },
          {
            "square": "b4",
            "color": "red"
          }
        ]
      },
      {
        "san": "Nf6",
        "comment": "Noir tente de rattraper son retard de développement."
      },
      {
        "san": "Nf3",
        "comment": "Consolidation. On menace aussi d'attaquer le fou b4 avec c3 ou a3.",
        "arrows": [
          {
            "from": "c2",
            "to": "c3",
            "color": "yellow"
          },
          {
            "from": "a2",
            "to": "a3",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "d6",
        "comment": "Noir essaye de regagner du terrain."
      },
      {
        "san": "Bb2",
        "comment": "<em>Repli tranquille.</em> Le fou retourne sur sa case idéale. Nous avons un pion d'avance et une position saine. <strong>Suite :</strong> e3, Fe2, 0-0.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...e5",
    "name": "2...Cc6 : chasser avec b5",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Nc6",
        "comment": "Noir défend e5 avec le cavalier. <strong>Mais</strong> ce cavalier est fragile sur c6 : il peut être chassé par b5.",
        "circles": [
          {
            "square": "c6",
            "color": "red"
          }
        ]
      },
      {
        "san": "b5",
        "comment": "<em>On pousse !</em> Le cavalier doit bouger et la case c6 est maintenant fermée pour un éventuel Cb8. <strong>Attention stratégique :</strong> en chassant le cavalier, on ne défend plus e5 — mais le cavalier noir va aller sur une mauvaise case.",
        "arrows": [
          {
            "from": "b4",
            "to": "b5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "c6",
            "color": "red"
          }
        ]
      },
      {
        "san": "Nd4",
        "comment": "Le cavalier cherche refuge au centre, mais il sera vite chassé."
      },
      {
        "san": "e3",
        "comment": "On le chasse !",
        "arrows": [
          {
            "from": "e3",
            "to": "d4",
            "color": "red"
          }
        ]
      },
      {
        "san": "Nf5",
        "comment": "Le cavalier se replie sur une case médiocre et loin de e5."
      },
      {
        "san": "Bxe5",
        "comment": "<em>🎯 Pion gagné !</em> Pendant que le cavalier noir se promène, on rafle le pion central.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "e5",
            "color": "green"
          }
        ]
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": "Retour sur la grande diagonale avec un pion en plus.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...e5",
    "name": "2...d5 : prise gratuite",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": "Noir ouvre le centre sans défendre e5. <strong>Erreur stratégique</strong> — le pion e5 est désormais totalement indéfendable.",
        "circles": [
          {
            "square": "e5",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bxe5",
        "comment": "<em>🎯 Pion gratuit !</em> On prend simplement.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "e5",
            "color": "green"
          }
        ]
      },
      {
        "san": "Nc6",
        "comment": "Noir attaque le fou pour compenser."
      },
      {
        "san": "Bb2",
        "comment": "Retour tranquille sur la grande diagonale. Un pion de plus.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...e5",
    "name": "2...Cf6 : échange simplifiant",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": "Développement flexible. Noir ne défend pas e5 directement mais attaque indirectement."
      },
      {
        "san": "Bxe5",
        "comment": "<em>Prise du pion.</em> On accepte l'échange qui suit forcément.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ]
      },
      {
        "san": "Bxb4",
        "comment": "Noir récupère le pion. Matériellement équilibré."
      },
      {
        "san": "Nf3",
        "comment": "Développement naturel. <strong>Avantage :</strong> nos pièces sont actives, celles de Noir dispersées.",
        "arrows": [
          {
            "from": "g1",
            "to": "f3",
            "color": "green"
          }
        ]
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": "Position saine avec initiative pour les Blancs.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "Ligne principale : setup avec a3",
    "moves": [
      {
        "san": "b4",
        "comment": "",
        "arrows": [
          {
            "from": "b2",
            "to": "b4",
            "color": "green"
          }
        ]
      },
      {
        "san": "d5",
        "comment": "Réponse classique. Noir occupe le centre sans défier b4.",
        "circles": [
          {
            "square": "d5",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bb2",
        "comment": "Le fou prend sa place. Diagonale ouverte vers le roque adverse.",
        "arrows": [
          {
            "from": "c1",
            "to": "b2",
            "color": "green"
          }
        ]
      },
      {
        "san": "Nf6",
        "comment": "Développement naturel."
      },
      {
        "san": "e3",
        "comment": "Setup typique : on prépare Cf3 + Fe2 + 0-0.",
        "arrows": [
          {
            "from": "f1",
            "to": "e2",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e6",
        "comment": "Noir ferme sa diagonale mais prépare un développement solide."
      },
      {
        "san": "a3",
        "comment": "<em>⚠️ COUP ESSENTIEL !</em> On soutient b4 pour empêcher <strong>...a5</strong> qui déstabiliserait notre aile dame. <strong>Ne jamais sauter a3</strong> dans les lignes avec ...d5 !",
        "arrows": [
          {
            "from": "a2",
            "to": "a3",
            "color": "green"
          },
          {
            "from": "a7",
            "to": "a5",
            "color": "red"
          }
        ],
        "circles": [
          {
            "square": "b4",
            "color": "green"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": "Noir prépare le roque."
      },
      {
        "san": "Nf3",
        "comment": "Développement harmonieux.",
        "arrows": [
          {
            "from": "g1",
            "to": "f3",
            "color": "green"
          }
        ]
      },
      {
        "san": "O-O",
        "comment": "Noir roque. C'est maintenant à nous de jouer c4."
      },
      {
        "san": "c4",
        "comment": "<em>Setup complet !</em> Le duo <strong>b4-c4</strong> forme un bloc puissant à l'aile dame. <strong>Plans :</strong><br>• <span style='color:' + '#81b64c' + '>cxd5</span> au bon moment pour ouvrir la diagonale<br>• <span style='color:' + '#e8a33d' + '>d4</span> pour prendre le centre<br>• <span style='color:' + '#e8a33d' + '>Cc3 + roque</span> pour terminer le développement",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          },
          {
            "from": "c4",
            "to": "d5",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "d5",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "Piège : 3...Fxb4 ?? 4.Fxg7 !",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": "Attention : le fou b2 regarde g7 ! Noir doit bloquer la diagonale avec ...Cf6, ou protéger avec le fou f8."
      },
      {
        "san": "e6",
        "comment": "Noir ouvre la diagonale pour son fou. Mais attention, g7 est exposé si le fou s'en va !"
      },
      {
        "san": "e3",
        "comment": "Coup neutre qui prépare le piège à venir."
      },
      {
        "san": "Bxb4",
        "comment": "<em>⚠️ GROSSE ERREUR !</em> Noir prend le pion au lieu de jouer le prudent ...Cf6. Le fou f8 abandonne la défense de g7 et la diagonale est grande ouverte.",
        "circles": [
          {
            "square": "g7",
            "color": "red"
          },
          {
            "square": "b4",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bxg7",
        "comment": "<em>🎯 LE PIÈGE CLASSIQUE DU SOKOLSKY !</em> On va <strong>manger la tour h8</strong> au coup suivant, pour un gain matériel énorme ! À savoir par cœur.",
        "arrows": [
          {
            "from": "b2",
            "to": "g7",
            "color": "green"
          },
          {
            "from": "g7",
            "to": "h8",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "g7",
            "color": "green"
          },
          {
            "square": "h8",
            "color": "red"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "3...c5 : le contre central",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "e6",
        "comment": "Noir prépare le développement de son fou."
      },
      {
        "san": "a3",
        "comment": "<em>Toujours a3</em> face à ...d5.",
        "arrows": [
          {
            "from": "a2",
            "to": "a3",
            "color": "green"
          }
        ]
      },
      {
        "san": "c5",
        "comment": "Contre-attaque sur l'aile dame. Noir veut liquider b4.",
        "arrows": [
          {
            "from": "c5",
            "to": "b4",
            "color": "red"
          }
        ]
      },
      {
        "san": "bxc5",
        "comment": "On prend simplement.",
        "arrows": [
          {
            "from": "b4",
            "to": "c5",
            "color": "green"
          }
        ]
      },
      {
        "san": "Bxc5",
        "comment": "Noir récupère le pion."
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "Nc6",
        "comment": ""
      },
      {
        "san": "d4",
        "comment": "<em>🎯 Coup clé !</em> On ouvre le jeu au centre ET on attaque le fou c5. Gain d'espace et initiative.",
        "arrows": [
          {
            "from": "d2",
            "to": "d4",
            "color": "green"
          },
          {
            "from": "d4",
            "to": "c5",
            "color": "red"
          }
        ],
        "circles": [
          {
            "square": "c5",
            "color": "red"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "2...Ff5 : le fou actif",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Bf5",
        "comment": "Noir sort son fou avant de le bloquer avec ...e6. Bonne idée stratégique.",
        "arrows": [
          {
            "from": "c8",
            "to": "f5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "e6",
        "comment": ""
      },
      {
        "san": "a3",
        "comment": "<em>Setup classique.</em> Suivra c4 pour attaquer le centre. <strong>Rappel :</strong> a3 est OBLIGATOIRE dans les lignes avec ...d5.",
        "arrows": [
          {
            "from": "a2",
            "to": "a3",
            "color": "green"
          },
          {
            "from": "c2",
            "to": "c4",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "2...c6 : Slave renversé",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "c6",
        "comment": "Structure Slave : solide mais passive.",
        "circles": [
          {
            "square": "c6",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "Bg4",
        "comment": "Noir active son fou avant de le bloquer."
      },
      {
        "san": "c4",
        "comment": "<em>Attaque du centre !</em> Avec ...c6 joué, Noir ne peut plus jouer ...c5 facilement. On a l'initiative.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          },
          {
            "from": "c4",
            "to": "d5",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...d5",
    "name": "2...Cc6 : chasser avec b5",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Nc6",
        "comment": "Rare mais possible. Le cavalier est fragile.",
        "circles": [
          {
            "square": "c6",
            "color": "red"
          }
        ]
      },
      {
        "san": "b5",
        "comment": "<em>Chasse immédiate !</em> Le cavalier doit reculer sur une mauvaise case.",
        "arrows": [
          {
            "from": "b4",
            "to": "b5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "c6",
            "color": "red"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...Cf6",
    "name": "2...d5 : transposition",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": "Coup flexible : Noir attend notre plan avant de se décider.",
        "circles": [
          {
            "square": "e4",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": "<strong>Transposition</strong> vers la ligne principale contre ...d5."
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "e6",
        "comment": ""
      },
      {
        "san": "a3",
        "comment": "<em>Toujours a3 !</em>",
        "arrows": [
          {
            "from": "a2",
            "to": "a3",
            "color": "green"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "c4",
        "comment": "Position type du répertoire.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...Cf6",
    "name": "2...g6 : fianchetto (pas de a3 !)",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "g6",
        "comment": "<em>Attention : setup différent !</em> Noir prépare le fianchetto qui contrera notre fou b2.",
        "arrows": [
          {
            "from": "f8",
            "to": "g7",
            "color": "red"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Bg7",
        "comment": "Les deux fous se regardent sur la grande diagonale. Position équilibrée.",
        "arrows": [
          {
            "from": "g7",
            "to": "b2",
            "color": "yellow"
          },
          {
            "from": "b2",
            "to": "g7",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "c4",
        "comment": "<em>⚠️ PAS de a3 ici !</em> Face au fianchetto, on développe vite. Noir ne menace pas ...a5 car il doit d'abord consolider son roque.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Be2",
        "comment": "Roque prévu. Plan ultérieur : Cc3 puis <strong>d4</strong> pour dominer le centre.",
        "arrows": [
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "d4",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...Cf6",
    "name": "2...e5 !? : la provocation",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": "Gambit : Noir offre e5 pour accélérer son développement.",
        "circles": [
          {
            "square": "e5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Bxe5",
        "comment": "<em>On prend.</em> L'échange qui suit est forcé mais reste favorable aux Blancs.",
        "arrows": [
          {
            "from": "b2",
            "to": "e5",
            "color": "green"
          }
        ]
      },
      {
        "san": "Bxb4",
        "comment": "Noir rétablit l'équilibre matériel."
      },
      {
        "san": "Nf3",
        "comment": "Développement calme. On a gardé un meilleur développement.",
        "arrows": [
          {
            "from": "g1",
            "to": "f3",
            "color": "green"
          }
        ]
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": "Retour au calme. Pas de pion gagné mais position très saine.",
        "arrows": [
          {
            "from": "e5",
            "to": "b2",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Contre 1...Cf6",
    "name": "2...d6 : système hybride",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "d6",
        "comment": "Noir prépare souvent ...e5 pour construire une structure solide."
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": "Transposition vers la structure Philidor. <strong>Important :</strong> pas de a3 ici — on fait c4 + Cc3.",
        "circles": [
          {
            "square": "e5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "c4",
        "comment": "<em>Setup anti-d6</em> (c4 + Cc3). Pas besoin de a3 car Noir a déjà joué ...d6 qui limite sa mobilité.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": ""
      },
      {
        "san": "Be2",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "Nc3",
        "comment": "Position type atteinte : pièces actives, centre contrôlé.",
        "arrows": [
          {
            "from": "b1",
            "to": "c3",
            "color": "green"
          },
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "d4",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...e6 : transposition vers d5",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "e6",
        "comment": "Coup neutre. Souvent suivi de ...d5."
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": "Transposition classique vers notre ligne d5.",
        "circles": [
          {
            "square": "d5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "a3",
        "comment": "Setup avec a3 obligatoire.",
        "arrows": [
          {
            "from": "a2",
            "to": "a3",
            "color": "green"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "c4",
        "comment": "Position type du répertoire.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...c6 : Caro-Kann inversé",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "c6",
        "comment": "Structure Slave/Caro-Kann en préparation."
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "d5",
        "comment": ""
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "Bg4",
        "comment": "Noir active son fou avant de le bloquer avec ...e6."
      },
      {
        "san": "c4",
        "comment": "Attaque du centre. Noir doit choisir entre ...dxc4 (ouvre le jeu) ou ...e6 (passif).",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          },
          {
            "from": "c4",
            "to": "d5",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...c5 : on prend !",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "c5",
        "comment": "Noir attaque b4 direct mais laisse sa structure fragile.",
        "arrows": [
          {
            "from": "c5",
            "to": "b4",
            "color": "red"
          }
        ]
      },
      {
        "san": "bxc5",
        "comment": "<em>On prend simplement !</em> On ne peut pas défendre b4 utilement.",
        "arrows": [
          {
            "from": "b4",
            "to": "c5",
            "color": "green"
          }
        ]
      },
      {
        "san": "e6",
        "comment": "Noir prépare ...Fxc5 pour récupérer le pion."
      },
      {
        "san": "d4",
        "comment": "<em>🎯 Coup clé !</em> On soutient c5 avec d4. Le pion sera défendable et on aura un <strong>centre massif</strong> (c5 + d4).",
        "arrows": [
          {
            "from": "d2",
            "to": "d4",
            "color": "green"
          },
          {
            "from": "d4",
            "to": "c5",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "c5",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...a5 : on avance !",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "a5",
        "comment": "Tentative d'attaque directe de b4.",
        "arrows": [
          {
            "from": "a5",
            "to": "b4",
            "color": "red"
          }
        ]
      },
      {
        "san": "b5",
        "comment": "<em>On avance !</em> Le pion en b5 est <strong>solide</strong> (aucun pion noir ne peut l'attaquer) et gagne de l'espace. Plan futur : c4 + Fb2 + Cf3.",
        "arrows": [
          {
            "from": "b4",
            "to": "b5",
            "color": "green"
          }
        ],
        "circles": [
          {
            "square": "b5",
            "color": "green"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...d6 + e5 : Philidor renversé",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "e5",
        "comment": "Structure Philidor-like : solide mais passive.",
        "circles": [
          {
            "square": "e5",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "c4",
        "comment": "<em>Setup anti-d6</em> : c4 + Cc3 (<strong>PAS de a3</strong>). Noir ne peut plus jouer ...c5 facilement.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      },
      {
        "san": "Be7",
        "comment": ""
      },
      {
        "san": "Be2",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "Nc3",
        "comment": "Position cible. Pièces harmonieuses, prêt pour d4 ou Cd5.",
        "arrows": [
          {
            "from": "b1",
            "to": "c3",
            "color": "green"
          },
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          }
        ],
        "circles": [
          {
            "square": "d5",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...g6 : fianchetto direct",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "g6",
        "comment": "Noir annonce son fianchetto tout de suite."
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "Bg7",
        "comment": "Les deux fous se regardent sur la grande diagonale.",
        "arrows": [
          {
            "from": "b2",
            "to": "g7",
            "color": "yellow"
          },
          {
            "from": "g7",
            "to": "b2",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "Nf3",
        "comment": ""
      },
      {
        "san": "O-O",
        "comment": ""
      },
      {
        "san": "c4",
        "comment": "Setup anti-fianchetto classique.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "green"
          }
        ]
      },
      {
        "san": "d6",
        "comment": ""
      },
      {
        "san": "Be2",
        "comment": "Plan : roque puis d4 au bon moment.",
        "arrows": [
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          }
        ]
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...b6 : double fianchetto",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "b6",
        "comment": "Noir imite : son fou ira aussi sur la grande diagonale."
      },
      {
        "san": "Bb2",
        "comment": ""
      },
      {
        "san": "Bb7",
        "comment": "Duel symétrique sur les diagonales.",
        "arrows": [
          {
            "from": "b2",
            "to": "h8",
            "color": "yellow"
          },
          {
            "from": "b7",
            "to": "h1",
            "color": "yellow"
          }
        ]
      },
      {
        "san": "e3",
        "comment": ""
      },
      {
        "san": "e6",
        "comment": ""
      },
      {
        "san": "Nf3",
        "comment": "Jeu positionnel calme. Plan : c4, Fe2, 0-0, puis actions centrales ou à l'aile dame."
      }
    ]
  },
  {
    "category": "Autres réponses",
    "name": "1...f5 : la Hollandaise",
    "moves": [
      {
        "san": "b4",
        "comment": ""
      },
      {
        "san": "f5",
        "comment": "Noir joue Hollandaise : il affaiblit sa case e5 mais attaque à l'aile roi.",
        "circles": [
          {
            "square": "e5",
            "color": "red"
          },
          {
            "square": "g7",
            "color": "red"
          }
        ]
      },
      {
        "san": "Bb2",
        "comment": "<em>La diagonale a1-h8 est brûlante !</em> Avec ...f5, Noir a affaibli la diagonale. Gros potentiel d'attaque pour nous.",
        "arrows": [
          {
            "from": "b2",
            "to": "h8",
            "color": "red"
          }
        ],
        "circles": [
          {
            "square": "h8",
            "color": "red"
          }
        ]
      },
      {
        "san": "Nf6",
        "comment": ""
      },
      {
        "san": "e3",
        "comment": "Setup normal : c4, Fe2, roque. Plan agressif possible avec d4 et Cd2-Cc4 pour viser e5/d6.",
        "arrows": [
          {
            "from": "c2",
            "to": "c4",
            "color": "yellow"
          },
          {
            "from": "d2",
            "to": "d4",
            "color": "yellow"
          }
        ]
      }
    ]
  }
] };