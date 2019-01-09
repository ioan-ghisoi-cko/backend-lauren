var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app);
var rp = require('request-promise');
var cors = require('cors');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

app.use(cors({ origin: '*' }));
app.use(bodyParser());

app.post('/csv', function (req, res) {
    var options = {
      method: 'get',
      json: true,
      url: "https://api.checkout.com/reconciliation/transactions/download?from=" + req.body.startDate + "&to=" + req.body.endDate + "&payout_id=" + req.body.payoutId,
      headers: {
        'authorization': req.body.key,
      }
    }

    rp(options)
      .then(function (response) {
        try {
          res.status(200).send(response);
        } catch (err) {
          res.status(500).send("Server error");
        }
      })
      .catch(function (err) {
        res.send(err.error);
      });
});

app.post('/balance', function (req, res) {
    console.log(req.body);
    var options = {
      method: 'get',
      json: true,
      url: "https://api.checkout.com/reconciliation/balance?from=" + req.body.startDate + "&to=" + req.body.endDate,
      headers: {
        'authorization': req.body.key,
      }
    }

    rp(options)
      .then(function (response) {
        try {
          res.status(200).send(response);
        } catch (err) {
          res.status(500).send("Server error");
        }
      })
      .catch(function (err) {
        res.send(err.error);
      });
});

app.post('/statements', function (req, res) {
    var options = {
      method: 'get',
      json: true,
      url: "https://api.checkout.com/reconciliation/statements?from=" + req.body.startDate + "&to=" + req.body.endDate + "&include=payout_breakdown",
      headers: {
        'authorization': req.body.key,
      }
    }

    rp(options)
      .then(function (response) {
        try {
          res.status(200).send(response);
        } catch (err) {
          res.status(500).send("Server error");
        }
      })
      .catch(function (err) {
        res.send(err.error);
      });
});

server.listen(port, function () {
  console.log('Listening on port ' + port + '...')
})