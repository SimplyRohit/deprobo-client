/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/prediction_market.json`.
 */
export type PredictionMarket = {
  address: "49ofcTbAdsnMfqUtJcNsECwkNUDgf6he1pdLdot5GQLQ";
  metadata: {
    name: "predictionMarket";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "claimWinnings";
      discriminator: [161, 215, 24, 59, 14, 236, 242, 221];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "yesPool";
          writable: true;
        },
        {
          name: "noPool";
          writable: true;
        },
        {
          name: "bet";
          writable: true;
        },
        {
          name: "user";
          writable: true;
          signer: true;
          relations: ["bet"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "createMarket";
      discriminator: [103, 226, 97, 235, 200, 188, 251, 254];
      accounts: [
        {
          name: "market";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 97, 114, 107, 101, 116];
              },
              {
                kind: "account";
                path: "creator";
              },
              {
                kind: "arg";
                path: "question";
              }
            ];
          };
        },
        {
          name: "yesPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [121, 101, 115, 95, 112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "noPool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [110, 111, 95, 112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "question";
          type: "string";
        }
      ];
    },
    {
      name: "placeBet";
      discriminator: [222, 62, 67, 220, 63, 166, 126, 33];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "bet";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 101, 116];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "market";
              }
            ];
          };
        },
        {
          name: "yesPool";
          writable: true;
        },
        {
          name: "noPool";
          writable: true;
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "outcome";
          type: "bool";
        }
      ];
    },
    {
      name: "resolveMarket";
      discriminator: [155, 23, 80, 173, 46, 74, 23, 239];
      accounts: [
        {
          name: "market";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["market"];
        }
      ];
      args: [
        {
          name: "outcome";
          type: "bool";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "betAccount";
      discriminator: [117, 187, 165, 174, 194, 28, 119, 76];
    },
    {
      name: "market";
      discriminator: [219, 190, 213, 55, 0, 227, 198, 154];
    },
    {
      name: "poolAccount";
      discriminator: [116, 210, 187, 119, 196, 196, 52, 137];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "alreadyResolved";
      msg: "Market already resolved";
    },
    {
      code: 6001;
      name: "notResolved";
      msg: "Market not yet resolved";
    },
    {
      code: 6002;
      name: "alreadyClaimed";
      msg: "Winnings already claimed";
    },
    {
      code: 6003;
      name: "wrongBet";
      msg: "Bet outcome is not the winner";
    }
  ];
  types: [
    {
      name: "betAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "market";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "outcome";
            type: "bool";
          },
          {
            name: "claimed";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "market";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "question";
            type: "string";
          },
          {
            name: "yesPool";
            type: "pubkey";
          },
          {
            name: "noPool";
            type: "pubkey";
          },
          {
            name: "totalYes";
            type: "u64";
          },
          {
            name: "totalNo";
            type: "u64";
          },
          {
            name: "resolved";
            type: "bool";
          },
          {
            name: "winningOutcome";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "poolAccount";
      type: {
        kind: "struct";
        fields: [];
      };
    }
  ];
};
