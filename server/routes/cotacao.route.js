  const router = require('express').Router();
  const cotacaoService = require('../services/cotacao.service');

  router.get('/cotacao', cotacaoService.cotacao);

  module.exports = router;