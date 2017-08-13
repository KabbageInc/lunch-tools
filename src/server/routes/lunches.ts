import {ImageSearchService} from '../services/imageSearch';
import {Router} from 'express';
import * as moment from 'moment';
import {LunchService} from '../services/lunchService';
const router = Router();
const db = new LunchService();

// test method for new image search
// const search = new ImageSearchService();

// router.get('/test/images/:query', (req, res) => {
//     return search.search(req.params.query)
//     .subscribe(
//         results => res.send(results),
//         err => {
//             console.error(err);
//             return res.status(500).send(err);
//         }
//     )
// });

router.get('/', (req, res) => {
  db.getLunches().subscribe(
      lunches => {
        res.send(lunches);
      }, err => {
        res.status(err.Status);
        res.send(err.Message);
      }
  );
});

router.get('/:date', (req, res) => {
  const targetDate = moment(req.params.date).format('YYYY-MM-DD');
  db.getLunchByDate(targetDate).subscribe(
    result => {
      res.send(result);
    }, err => {
      res.status(err.Status),
      res.send(err.Message)
    }
  );
});

router.put('/:date', (req, res) => {
  const targetDate = moment(req.params.date).format('YYYY-MM-DD');

  if (req.body.menu == null) {
    return res.status(400).send('menu field is required');
  }

  db.saveLunches([{date: targetDate, menu: req.body.menu}])
  .subscribe(
    result => {
      return res.send(result);
    }, err => {
      res.status(err.Status);
      return res.send(err.Message);
    }
  );
});

router.post('/', (req, res) => {
  if (!req.body || !req.body.length) {
    return res.status(400).send('Body must contain an array of lunches');
  }
  if (req.body.some(l => !l.date || !l.menu || !l.menu.length)) {
    return res.status(400).send('All lunches must contain a date key and a menu key');
  }
  const lunches = req.body.map(l => {
    return {
      date: moment(l.date).format('YYYY-MM-DD'),
      menu: l.menu
    }
  });
  db.saveLunches(lunches).subscribe(
    result => {
      return res.send(result);
    }, err => {
      res.status(err.Status);
      return res.send(err.Message);
    }
  );
});

router.post('/:date/ratings', (req, res) => {
  const targetDate = moment(req.params.date).format('YYYY-MM-DD');

  if (!req.body.rating || (parseInt(req.body.rating, 10) !== -1 && parseInt(req.body.rating, 10) !== 1)) {
    return res.status(400).send('rating must be either -1 or 1');
  }

  db.rateLunch(targetDate, parseInt(req.body.rating, 10)).subscribe(
    result => {
      return res.send(result);
    }, err => {
      res.status(err.Status);
      return res.send(err.Message);
    }
  );
});

router.post('/:date/comments', (req, res) => {
  const targetDate = moment(req.params.date).format('YYYY-MM-DD');

  if (!req.body || !req.body.message) {
    return res.status(400).send('message field is required');
  }
  db.commentOnLunch(targetDate, req.body.message, req.body.name || 'Anonymous')
  .subscribe(
        result => {
      return res.send(result);
    }, err => {
      res.status(err.Status);
      return res.send(err.Message);
    }
  );
});

router.delete('/:date', (req, res) => {
  const targetDate = moment(req.params.date).format('YYYY-MM-DD');
  db.deleteLunch(targetDate).subscribe(
    result => {
      return res.send(result);
    }, err => {
      res.status(err.Status);
      return res.send(err.Message);
    }
  );
});

module.exports = router;
