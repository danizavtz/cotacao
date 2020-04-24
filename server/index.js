const router = require('express').Router();
const cotacao = require('./routes/cotacao.route')
router.use(cotacao)
router.get('/', (req, res) => {    
    res.status(200).json({ msg: 'server up and running' });
})

router.get('*', (req, res) => {
    res.status(404).json({errors: [{ location: 'route', msg: 'Não encontrado', param: req.path }]});
});

module.exports = router;