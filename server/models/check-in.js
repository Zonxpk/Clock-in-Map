const Bookshelf = require('../config/bookshelf.config');
const Promise = require('bluebird');
const moment = require('moment');
// Bookshelf.plugin('registry')
const User = require('./user');
const Location = require('./location');
const CheckIn = Bookshelf.Model.extend({
  tableName: 'pl_check_in',
  idAttribute : 'ci_id',
  location: function(){
    return this.hasOne('Location','lc_ci_id','ci_id');
  },
  user: function(){
    return this.belongsTo('User','us_id','ci_us_id');
  },
  profile: function(){
    return this.hasOne('User','us_id','ci_us_id').query((qb) => {
      qb.leftJoin('ums_role','ums_role.ro_id','=','us_role_id');
      qb.leftJoin('ums_prefix','ums_prefix.pf_id','=','us_prefix_id');
      qb.leftJoin('ums_gender','ums_gender.gd_id','=','us_gender_id');
      qb.select(
        'us_id',
        'ro_name as us_role',
        'us_code',
        Bookshelf.knex.raw('CONCAT(pf_name, us_fname, \' \', us_lname) as "us_name"'),
        'gd_name as us_gender',
        'us_email',
        'us_phone',
        'us_since'
      );
    });
  },
  logByDate: function(){
    return this.hasMany('CheckIn','fk_date','subject').query((qb)  =>  {
      qb.leftJoin('ums_user','ums_user.us_id','=','ci_us_id');
      qb.leftJoin('ums_role','ums_role.ro_id','=','ums_user.us_role_id');
      qb.leftJoin('ums_prefix','ums_prefix.pf_id','=','ums_user.us_prefix_id');
      qb.leftJoin('ums_gender','ums_gender.gd_id','=','ums_user.us_gender_id');
      qb.select(
          'fk_date',
          'ci_id', 
          'ci_subject as subject',
          'ci_detail as detail',
          'ci_date_create as date',
          'ci_status as status',
          'ci_img_path as img',
          'us_id',
          'us_code',
          'ro_name as role',
          Bookshelf.knex.raw('CONCAT(pf_name, us_fname, \' \', us_lname) as "name"'),
        ).from(function() {
          this.select(Bookshelf.knex.raw("DATE_FORMAT(ci_date_create, '%d-%m-%Y') as fk_date") ,
          'ci_id', 
          'ci_us_id', 
          'ci_subject',
          'ci_detail',
          'ci_img_path',
          'ci_date_create',
          'ci_status',
        ).from('pl_check_in').as('pl_check_in')})
      // .where('ro_name','=','user')
      .orderBy('ci_date_create','DESC');
    });


  }
});

module.exports = Bookshelf.model('CheckIn',CheckIn); 
