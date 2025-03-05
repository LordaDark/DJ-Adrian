module.exports = {
  env: {
    node: true, // Aggiungi questa riga per configurare Node.js
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Aggiungi il plugin per React, se necessario
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Regole personalizzate, se necessarie
  },
  settings: {
    react: {
      version: 'detect', // Rileva automaticamente la versione di React
    },
  },
  
};
