const axios = require('axios');
// api openexchange
const oexchange = axios.create({
    baseURL: 'https://openexchangerates.org/api/',
    timeout: parseInt(process.env.TIMEOUTEXTERNALREQUEST)
})
oexchange.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params.app_id = process.env.OPENEXCHANGEAPITOKEN
    return config;
});

exports.cotacao = async (req, res) => {
    try {
        req.oexchange = await oexchange.get('latest.json')
        return res.status(200).json(req.oexchange.data)
    } catch (e) {
        res.status(500).json({errors: [{ location: 'cotacao', msg: 'Houve um erro ao acessar a api do open exchange.', param: 'openexchangerates' }]})
    }
}