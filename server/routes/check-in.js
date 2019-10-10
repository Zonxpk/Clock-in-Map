const Bookshelf = require('../config/bookshelf.config');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const moment = require('moment');
const Promise = require('bluebird');
const CheckIn = require('../models/check-in')
const Location = require('../models/location')
const User = require('../models/user')
const Users = require('../models/user')

const multer = require('multer');

var filename;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, filename)
  }
});
const upload = multer({storage: storage});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('check in work');
});

/* GET user profile. */
router.post('/log-by-person', function(req, res, next) {
  const {us_id} = req.body;
  console.log(req.body);
  Promise.coroutine(function* () {
    const check_in = yield CheckIn.where('ci_us_id',us_id)
    .query('orderBy', 'ci_date_create', 'desc')
    .fetchAll({withRelated : 'location',});
      if(check_in){
        check_in.forEach(result => {
          let ci_date = moment(result.get('ci_date_create'));
          ci_date.add(543, 'years');
          ci_date.locale('th');
          result.set('ci_date',ci_date.format('DD MMM YYYY H:mm') + ' น.');
        });
        res.json(check_in);
      }else{
        res.status(400).send({message:'User not found.'});
      }
  })().catch(err => console.log(err));
});
router.post('/log-by-date', function(req, res, next) {
  let {start,end} = req.body;
  console.log(req.body);
  Promise.coroutine(function* () {
    const check_in = yield CheckIn.query(function (qb){
      qb.select(Bookshelf.knex.raw("DATE_FORMAT(ci_date_create, '%d-%m-%Y') as subject")) // ci_date to subject for tree-grid's table header
      .from(function() {
        this.leftJoin('ums_user','ums_user.us_id','=','ci_us_id');
        this.leftJoin('ums_role','ums_role.ro_id','=','us_role_id');
        this.select('*').from('pl_check_in').as('pl_check_in')
        this.where('ro_name','=','user');
      });
      qb.count('* as count');
      qb.whereBetween('ci_date_create', [start, end]);
      qb.groupBy('subject');
      qb.orderBy('subject','DESC');
    })
    .fetchAll({withRelated : ['logByDate','logByDate.location']});
      if(check_in){
        check_in.forEach(result =>{
            result.set('expanded',false); //set parent tree for tree-grid
            result.set('kind','dir'); //set icon for tree-grid
            let logByDate = result.related('logByDate'); //store related object to check_in's object
              logByDate.forEach(log =>{
                let ci_date = moment(log.get('date')); //store date value to variable
                ci_date.add(543, 'years'); //convert to buddhist year
                ci_date.locale('th'); //set thai language
                log.set('date',ci_date.format('DD MMM-YYYY H:mm') + ' น.'); //set date format
              });
        });
        res.json(check_in); 
      }else{
        res.status(400).send({message:'Date not found.'});
      }
  })().catch(err => console.log(err));
});

router.get('/sale-list', function(req , res, next) {
  Promise.coroutine(function* () {
    var sale = yield User.query((qb)=>{
      qb.leftJoin('ums_role','ums_role.ro_id','=','us_role_id');
      qb.leftJoin('ums_prefix','ums_prefix.pf_id','=','us_prefix_id');
      qb.leftJoin('ums_gender','ums_gender.gd_id','=','us_gender_id');
      qb.select(
        'us_id as id',
        'ro_name as role',
        'us_code as code',
        'pf_name as prefix',
        'us_fname as fname',
        'us_lname as lname',
        'gd_name as gender',
        Bookshelf.knex.raw('CONCAT(pf_name, \' \', us_fname, \' \', us_lname) as "name"')
      )
      qb.where('ro_name','=','root');
      qb.orWhere('ro_name','=','admin');
      qb.orWhere('ro_name','=','user');
    }).fetchAll();
      if(sale){
        // sale.forEach(obj => {
        //   console.log(JSON.stringify(obj.attributes));
        // });
        res.send(sale);
      }else{
        console.log('(ERR) sale_list: Sale not found');
        res.status(400).send({message:'Sale not found.'});
      }
  })().catch(err => console.log(err));
});

router.post('/insert', (req, res) => {
  var ci_us_id = req.body.ci_us_id;
  var lc_name = req.body.lc_name;
  var lc_address = req.body.lc_address;
  var lc_postcode = req.body.lc_postcode;
  var lc_province = req.body.lc_province;
  var lc_latitude = req.body.lc_latitude;
  var lc_longitude = req.body.lc_longitude;
  var ci_subject = req.body.ci_subject;
  var ci_detail = req.body.ci_detail;
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  datenow = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  filename = ci_us_id + "_" + year + "-"+ month + "-" + date + "_" + hours + "-" + minutes + "-" + seconds + ".jpeg";

  CheckIn.forge({ci_us_id: ci_us_id,ci_subject: ci_subject,ci_detail: ci_detail, ci_img_path: filename,ci_date_create: datenow}).save().then(function(data_ci){
    Location.forge({lc_ci_id: data_ci.id, 
                    lc_name: lc_name,
                    lc_address: lc_address, 
                    lc_postcode: lc_postcode, 
                    lc_province: lc_province,
                    lc_latitude: lc_latitude,
                    lc_longitude: lc_longitude}).save().then(function(data_lc){
      let temp = {
        Check_in: data_ci,
        Location: data_lc
      }
    res.end()
    })
  })
});

router.post('/get_all_location',async (req, res) => {
  var ci_us_id = req.body.ci_us_id;
  var search = req.body.search;
  var page = req.body.page;
  // var ci_us_id = 1;
  let temp = await CheckIn.query(function (qb) {
    if(search != null){
      qb.where({'ci_us_id':ci_us_id,'ci_status':"Y"}).andWhere('ci_subject','LIKE','%'+search+'%');
    }else{
      qb.where({'ci_us_id':ci_us_id,'ci_status':"Y"});
    }
    qb.orderBy('ci_id','DESC'); 
  })
  .fetchPage({
    pageSize: 8,
    page: page
  })
    res.json(temp);
    // console.log('get_all_location');
});

router.post('/fileUpload', upload.single('image'), (req, res) => {
  // console.log('fileuploads');
  // console.log(req.file);
  res.send(req.file);
  
});

router.post('/delete',async (req, res) => {
  var ci_id = req.body.ci_id;
  // var ci_us_id = 1;
  let temp = await CheckIn.where('ci_id',ci_id).save({'ci_status':'N'},{method: 'update'},);
    res.json(temp);
    // console.log('delete');
});

router.post('/edit',async (req, res) => {
  var ci_id = req.body.ci_id;
  var ci_subject = req.body.ci_subject;
  var ci_detail = req.body.ci_detail;
  // var ci_us_id = 1;
  let temp = await CheckIn.where('ci_id',ci_id).save({'ci_subject':ci_subject,'ci_detail':ci_detail},{method: 'update'},);
    res.json(temp);
    // console.log('edit');
});

module.exports = router;