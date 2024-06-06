const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "expect",
        "type": "string"
      }
    ],
    "name": "ExpectInserted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "expect",
        "type": "string"
      }
    ],
    "name": "ExpectUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hashImage",
        "type": "string"
      }
    ],
    "name": "ImageInserted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "input",
        "type": "string"
      }
    ],
    "name": "InputUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "output",
        "type": "string"
      }
    ],
    "name": "OutputInserted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "output",
        "type": "string"
      }
    ],
    "name": "OutputUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "process",
        "type": "string"
      }
    ],
    "name": "ProcessInserted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "process",
        "type": "string"
      }
    ],
    "name": "ProcessUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "farm",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "input",
        "type": "string"
      }
    ],
    "name": "ProjectCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "weather",
        "type": "string"
      }
    ],
    "name": "WeatherInserted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_farm",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_input",
        "type": "string"
      }
    ],
    "name": "createProject",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProject",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectExpects",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectImages",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectInput",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectOutputs",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectProcesses",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getProjectWeathers",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_expect",
        "type": "string"
      }
    ],
    "name": "insertExpect",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_hashImage",
        "type": "string"
      }
    ],
    "name": "insertImage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_output",
        "type": "string"
      }
    ],
    "name": "insertOutput",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_process",
        "type": "string"
      }
    ],
    "name": "insertProcess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_weather",
        "type": "string"
      }
    ],
    "name": "insertWeather",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numberOfProjects",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projects",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "farm",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projectsByOwner",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_expect",
        "type": "string"
      }
    ],
    "name": "updateExpect",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_input",
        "type": "string"
      }
    ],
    "name": "updateInput",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_output",
        "type": "string"
      }
    ],
    "name": "updateOutput",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_process",
        "type": "string"
      }
    ],
    "name": "updateProcess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const video_abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "CameraAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "connectionLoss",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalLossPerDay",
        "type": "uint256"
      }
    ],
    "name": "ConnectionLossAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "imageHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "timeDesciption",
        "type": "string"
      }
    ],
    "name": "ImageAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "timeDesciption",
        "type": "string"
      }
    ],
    "name": "VideoAdded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "addCamera",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "connectionLoss",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "totalLossPerDay",
        "type": "uint256"
      }
    ],
    "name": "addConnectionLoss",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "imageHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "timeDesciption",
        "type": "string"
      }
    ],
    "name": "addImage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "videoHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "timeDesciption",
        "type": "string"
      }
    ],
    "name": "addVideo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cameraCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "cameras",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      }
    ],
    "name": "getCamera",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "timeDesciption",
            "type": "string"
          }
        ],
        "internalType": "struct VideoHashContract.Video[]",
        "name": "",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "connectionLoss",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "totalLossPerDay",
            "type": "uint256"
          }
        ],
        "internalType": "struct VideoHashContract.ConnectionLoss[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      }
    ],
    "name": "getConnectionLossByCamera",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "connectionLoss",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "totalLossPerDay",
            "type": "uint256"
          }
        ],
        "internalType": "struct VideoHashContract.ConnectionLoss[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "getConnectionLossByDateRange",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "connectionLoss",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "totalLossPerDay",
            "type": "uint256"
          }
        ],
        "internalType": "struct VideoHashContract.ConnectionLoss[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      }
    ],
    "name": "getImagesByCamera",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "timeDesciption",
            "type": "string"
          }
        ],
        "internalType": "struct VideoHashContract.Image[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "getImagesByDateRange",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "timeDesciption",
            "type": "string"
          }
        ],
        "internalType": "struct VideoHashContract.Image[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      }
    ],
    "name": "getVideosByCamera",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "timeDesciption",
            "type": "string"
          }
        ],
        "internalType": "struct VideoHashContract.Video[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cameraId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "getVideosByDateRange",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "timeDesciption",
            "type": "string"
          }
        ],
        "internalType": "struct VideoHashContract.Video[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = process.env.REACT_APP_PROJECT_CONTRACT_ADDRESS || "0x97e3B6d3132A36563b7B38E3eB5bC6af4b114623";
const videoContractAddress = process.env.REACT_APP_CAMERA_CONTRACT_ADDRESS || "0x83B9Dde03f142aD48d3e986A27b9ed32fEFfF340";

const jsonRpcURL = process.env.REACT_APP_jsonRpcURL || "https://evmos-pokt.nodies.app";
const eventMap = {
  '0xa7f8f582d090b5312bbe3d5f616508e184319e9e0f3824445f07745728304c5f': {
      name: 'ProjectCreated',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'address',
              name: 'owner',
              indexed: true,
          },
          {
              type: 'string',
              name: 'farm',
              indexed: false,
          },
          {
              type: 'string',
              name: 'input',
              indexed: false,
          }
      ]
  },
  '0x86ca012eeec5179616b871b1e8eac5e98a1abb80d429d200ae965170463ba85f': {
      name: 'ProcessInserted',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'process',
              indexed: false,
          }
      ]
  },
  '0x67c7b818c4a6649026cffd6fa5216819bcb4a5f1ce495e4b9b5aecb73bed54d7': {
      name: 'ExpectInserted',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'expect',
              indexed: false,
          }
      ]
  },
  '0x5d22b2c17f9c0779c52f956eb23d2080eefebdf90ac9873b3c9d9e08c52b0d9d': {
      name: 'OutputInserted',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'output',
              indexed: false,
          }
      ]
  },
  '0xf98fb96e12314e75bed7f8fa15959c9227cbdb7aa8774dc674ebe16c3780b7e8': {
      name: 'InputUpdated',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'input',
              indexed: false,
          }
      ]
  },
  '0x86ca012eeec5179616b871b1e8eac5e98a1abb80d429d200ae965170463ba85f': {
      name: 'ProcessUpdated',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'process',
              indexed: false,
          }
      ]
  },
  '0xd6e26280f779e80f6b6156ad164395e84a85d1f3ec41c70adb37cf41e743a2eb': {
      name: 'ExpectUpdated',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'expect',
              indexed: false,
          }
      ]
  },
  '0x2e8e85ac143af4ef00d5b2faf8dbf69ab450d72e9ac6f2f4236b818e2a0631ff': {
      name: 'OutputUpdated',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'output',
              indexed: false,
          }
      ]
  },
  '0x3fee1c70ec084e00a256424ab31507324668a0b12407659524b766ac1d43cea5': {
      name: 'CameraAdded',
      dataStructure: [
          {
              type: 'uint256',
              name: 'cameraId',
              indexed: true,
          },
          {
              type: 'address',
              name: 'owner',
              indexed: true,
          }
      ]
  },
  '0x568a3ea647075e7326b95087a8c72a649b4f6db67a119eb8cd979c81468b4aa5': {
      name: 'ConnectionLossAdded',
      dataStructure: [
          {
              type: 'uint256',
              name: 'cameraId',
              indexed: true,
          },
          {
              type: 'uint256',
              name: 'date',
              indexed: false,
          },
          {
              type: 'string',
              name: 'connectionLoss',
              indexed: false,
          },
          {
              type: 'uint256',
              name: 'totalLossPerDay',
              indexed: false,
          }
      ]
  },
  '0xf6ba110aff8c34e45880625e8ff9e3dc09e5df20397bd4a296b8728546d05350': {
      name: 'VideoAdded',
      dataStructure: [
          {
              type: 'uint256',
              name: 'cameraId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'videoHash',
              indexed: false,
          },
          {
              type: 'uint256',
              name: 'date',
              indexed: false,
          },
          {
              type: 'string',
              name: 'timeDesciption',
              indexed: false,
          }
      ]
  },
  '0xe': {
      name: 'ImageInserted',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'hashImage',
              indexed: false,
          }
      ]
  },
  '0xf': {
      name: 'WeatherInserted',
      dataStructure: [
          {
              type: 'uint256',
              name: 'projectId',
              indexed: true,
          },
          {
              type: 'string',
              name: 'weather',
              indexed: false,
          }
      ]
  },
  '0xe00e4f65a00c922549446ceed84c198bbf0086cfd35f5acf201dcce9721b6e8d': {
      name: 'ProductPurchased',
      dataStructure: [
        {
          indexed: false,
          name: "projectId",
          type: "string"
        },
        {
          indexed: false,
          name: "privateId",
          type: "string"
        },
        {
          indexed: false,
          name: "purchaseInfo",
          type: "string"
        }
      ],
    },
  '0x57817d1e9e317bce739cb023bbafa94e3b315ce6fbcf0c60b86aeedb898f483d': {
    name: 'QRGenerated',
    dataStructure: [
      {
        indexed: false,
        name: "projectId",
        type: "string"
      },
      {
        indexed: false,
        name: "generateQRInfo",
        type: "string"
      },
      {
        indexed: false,
        name: "timeGenerate",
        type: "uint256"
      }
    ]
  }
};

const eventMapData = (event) => {
  switch (event.name) {
      case 'ProjectCreated':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Owner: {event.data.owner}</li>
                  <li>Farm Id: {event.data.farm}</li>
                  <li>Input: {event.data.input}</li>
              </ul>
          )
      case 'ProcessInserted':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Process: {event.data.process}</li>
              </ul>
          )
      case 'ExpectInserted':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Expect: {event.data.expect}</li>
              </ul>
          )
      case 'OutputInserted':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Output: {event.data.output}</li>
              </ul>
          )
      case 'InputUpdated':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Input: {event.data.input}</li>
              </ul>
          )
      case 'ProcessUpdated':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Process: {event.data.process}</li>
              </ul>
          )
      case 'ExpectUpdated':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Expect: {event.data.expect}</li>
              </ul>
          )
      case 'OutputUpdated':
          return (
              <ul>
                  <li>Project Index: {Number(event.data.projectId)}</li>
                  <li>Output: {event.data.output}</li>
              </ul>
          )
      case 'CameraAdded':
          return (
              <ul>
                  <li>Camera Index: {Number(event.data.cameraId)}</li>
                  <li>Owner: {event.data.owner}</li>
              </ul>
          )
      case 'ConnectionLossAdded':
          return (
              <ul>
                  <li>Camera Index: {Number(event.data.cameraId)}</li>
                  <li>Date: {Number(event.data.date)}</li>
                  <li>Connection Loss: {event.data.connectionLoss}</li>
                  <li>Total Loss Per Day: {Number(event.data.totalLossPerDay)}</li>
              </ul>
          )
      case 'VideoAdded':
          return (
              <ul>
                  <li>Camera Index: {Number(event.data.cameraId)}</li>
                  <li>Video Hash: {event.data.videoHash}</li>
                  <li>Date: {Number(event.data.date)}</li>
                  <li>Time Description: {event.data.timeDesciption}</li>
              </ul>
          )
      case 'ProductPurchased':
          return (
              <ul>
                  <li>Project Id: {event.data.projectId}</li>
                  <li>Private Id: {event.data.privateId}</li>
                  <li>Purchase Info: {event.data.purchaseInfo}</li>
              </ul>
          )
      case 'QRGenerated':
          return (
              <ul>
                  <li>Project Id: {event.data.projectId}</li>
                  <li>Generate QR Info: {event.data.generateQRInfo}</li>
                  <li>Time Generate: {Number(event.data.timeGenerate)}</li>
              </ul>
          )
  }
}

export { abi, video_abi, contractAddress, videoContractAddress, jsonRpcURL, eventMap, eventMapData};
