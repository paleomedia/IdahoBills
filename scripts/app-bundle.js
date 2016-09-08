define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Idaho Bills';
            config.map([
                { route: ['', 'Home'], name: 'Home', moduleId: './Home/home', nav: true, title: 'Home' },
                { route: ['About'], name: 'About', moduleId: './About/about', nav: true, title: 'About' },
                { route: ['Lawmakers'], name: 'Lawmakers', moduleId: './Lawmakers/lawmakers', nav: true, title: 'Lawmakers' },
                { route: ['Topics'], name: 'Topics', moduleId: './Topics/topics', nav: true, title: 'Topics' },
                { route: ['bills/:id'], name: 'BillDetails', moduleId: './BillDeails/billDetails' },
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('About/about',["require", "exports"], function (require, exports) {
    "use strict";
    var About = (function () {
        function About() {
        }
        return About;
    }());
    exports.About = About;
});

define('BillDetails/billDetails',["require", "exports"], function (require, exports) {
    "use strict";
    var BillDetails = (function () {
        function BillDetails() {
        }
        return BillDetails;
    }());
    exports.BillDetails = BillDetails;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('Home/home',["require", "exports", 'aurelia-http-client', 'aurelia-framework'], function (require, exports, aurelia_http_client_1, aurelia_framework_1) {
    "use strict";
    var Home = (function () {
        function Home(http) {
            this.http = http;
            this.bills = [];
            this.loaded = false;
        }
        Home.prototype.postComment = function (bill, comment) {
            bill.comments = [];
            bill.comments.push(comment);
        };
        Home.prototype.getBills = function () {
            var _this = this;
            this.http.get('https://openstates.org/api/v1/bills/?state=id&search_window=session:2016&page&per_page=10&apikey=bcc2a830883c4f459dbffe94b2a3e90f')
                .then(function (data) {
                _this.bills = JSON.parse(data.response);
                sessionStorage.setItem('bill', data.response);
                _this.loaded = true;
            });
        };
        Home.prototype.activate = function (params, routeConfig, $navigationInstruction) {
            var billStorage = sessionStorage.getItem('bill');
            console.log(billStorage);
            if (billStorage == null) {
                this.getBills();
            }
            else {
                this.bills = JSON.parse(billStorage);
                this.loaded = true;
            }
        };
        Home = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [aurelia_http_client_1.HttpClient])
        ], Home);
        return Home;
    }());
    exports.Home = Home;
});

define('Lawmakers/lawmakers',["require", "exports"], function (require, exports) {
    "use strict";
    var Lawmakers = (function () {
        function Lawmakers() {
        }
        return Lawmakers;
    }());
    exports.Lawmakers = Lawmakers;
});

define('Topics/topics',["require", "exports"], function (require, exports) {
    "use strict";
    var Topics = (function () {
        function Topics() {
        }
        return Topics;
    }());
    exports.Topics = Topics;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./style.css\"></require>\n  <require from=\"./nav-bar.html\"></require>\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <div class=\"container content\">\n      <router-view></router-view>\n    </div>\n</template>"; });
define('text!style.css', ['module'], function(module) { module.exports = ".content{\n    margin-top: 5%;\n}\n\n/* .tops {\n\twidth: 100%;\n\theight: 170x;\n\tbackground-image: url(\"../images/topo.png\");\n\tbackground-repeat: repeat-x;\n\tfloat: left;\n\t}  */\nbody {\n  background-color: #e9ebee;\n}\n.page-header {\n  margin-top:50px;\n  background-image: url(\"../images/topo.png\");\n  width: 100%;\n  min-height: 50px;\n  border-bottom: 1px solid;\n}\n.page-header h1 {\n  margin-left: 50px;\n}\n.nav.pull-right>li>a {\n  padding: 10px 5px !important;\n}\n.modal-backdrop {\n    z-index: 1020;\n}\n#topline {\n\twidth: 100%;\n\theight: 40px;\n\tbackground-color: #99cccc;\n\topacity: 0.4;\n\tfloat: left;\n\t}\ndiv.socials {\n    margin: 0;\n    position: absolute;\n\ttop: 0;\n\tright: 0;\n\ttext-align: right;\n\tfont-size: 1.2em;\n\tpadding: 1.25em .5em;\n    }\n.socials ul {\n\tlist-style: none;\n\t}\n.socials li {\n    position: relative;\n\tdisplay: inline-block;\n\tmargin-right: .125em;\n\t}\nli.social_tw a {\n\ttext-decoration: none;\n\tbackground-image: url(\"../images/twittericon.png\");\n\t}\n#logoline {\n\twidth: 100%;\n\theight: 45px;\n\tfloat: left;\n\t}\n\t\t\ndiv#logo {\n\tfloat: left;\n\tfont-family: Garamond, \"Times New Roman\", serif;\n\tfont-size: 24px;\n\t}\n\t\n#slogan {\n\tfloat: left;\n\tfont-family: Garamond, \"Times New Roman\", serif;\n\tfont-size: 16px\n\tpadding: 40\n\t}\n\t\nbody {\n\tfont-family: 'Source Sans Pro', Helvetica, sans-serif;\n\tfont-size: 12px;\n\tline-height: 1.3rem;\n\tfont-weight: 400;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n#topline {\n\twidth: 100%;\n\theight: 100%;\n\tpadding: 10px;\n\tbackground-color: rgba(153, 204, 204, .4);\n\tfloat: left;\n}\ndiv.socials {\n\tmargin: 0;\n\tposition: absolute;\n\ttop: 0px;\n\tright: 5px;\n}\n.socials ul {\n\tlist-style: none;\n}\n.socials li {\n\tposition: relative;\n\tdisplay: inline;\n\tmargin-right: .125em;\n}\n.socials li a {\n\ttext-decoration: none;\n}\n#logoline {\n\twidth: 100%;\n\theight: 100%;\n\tfloat: left;\n}\n#logo {\n\tfloat: left;\n\tletter-spacing: .15em;\n\tfont-family: Garamond, \"Times New Roman\", serif;\n\tfont-size: 1.5rem;\n\tpadding: 0px 10px 0px 0px;\n}\n#slogan {\n\tfloat: left;\n\tfont-family: \"Trebuchet MS\", Helvetica, sans-serif;\n\tfont-size: .7rem;\n\tpadding: 25px 0px 0px 0px;\n}\n\n/*\n\nStyles for login\n\n*/\n\n.login_modal_footer {margin-top:5px;}\n.login_modal_header .modal-title {text-align: center;font-family:'Philosopher',sans-serif; }\n.form-group {position: relative;}\n.form-group .login-field-icon {\n    font-size: 20px;\n    position: absolute;\n    right: 15px;\n    top: 3px;\n    transition: all 0.25s ease 0s;\n    padding-top: 2%;  }\n.login-modal {\n    width:100%;\n    padding-bottom:20px;  }\n.login_modal_header, .login_modal_footer {background: #00BB64 !important;color:#fff;}\n.modal-register-btn {margin: 4% 33% 2% 33% ;width:100%;}\n.login-modal input {height:40px; box-shadow: none; border:1px solid #ddd;}\n.modal-body-left {float:left; width:50%; padding-right:4%; border-right:4px solid #ddd;}\n.modal-body-right {float:right; width:47%;}\n.login-link {padding:0 20%;}\n.modal-social-icons {padding:0 10%;}\n.facebook, .twitter, .google, .linkedin, .github {width:100%;height:40px; padding-top:2%; margin-top:2%;}\n.modal-icons {margin-left: -10px; margin-right: 20px;}\n.google, .google:hover {background-color:#dd4b39;border:2px solid #dd4b39;color:#fff;}\n.twitter, .twitter:hover { background-color: #00aced; border:2px solid #00aced;color: #fff;}\n.facebook, .facebook:hover {background-color: #3b5999; border:2px solid #3b5999;color:#fff;}\n.linkedin, .linkedin:hover {background-color: #007bb6; border: 2px solid #007bb6; color:#fff;}\n.github, .github:hover {background-color: black; border: 2px solid #fff; color:#fff;}\n#social-icons-conatainer {position: relative;}\n#center-line {position: absolute;  right: 265.7px;top: 80px;background:#ddd;  border: 4px solid #DDDDDD;border-radius: 20px;}\n.modal-login-btn {width:100%;height:40px; margin-bottom:10px;}\n/* #modal-launcher {margin: 30% 0 0 30%; } */\n\n.maincontainer {\n\tclear: both;\n\twidth: 100%;\n}\n\n/*\n\nDashboard styles\n\n*/\n\n.dashboard {\n\twidth: 20%;\n\theight: 100%;\n\tfloat: left;\n\tbackground-color: #EFF0F2;\n\tpadding: 0px;\n\tmargin-top: 10px;\n\tborder-right: solid 1px black;\n\tborder-bottom: solid 1px black;\n}\n.dashhead {\n\ttext-align: center;\n\tcolor: white;\n\tfont-size: 1.2rem;\n\ttext-transform: uppercase;\n\tpadding: 20px 0px 10px 0px;\n}\n.dashitem {\n\tcolor: #3F5388;\n\tpadding: 10px;\n\tline-height: 1em;\n}\n/* form {\n\twidth: 100%;\n\tmargin: 0px;\n} */\n#main-bill-panel, h1 .panel- {\n  background: #e9eaed;\n}\nh1 > .panel-heading {\n  background: #7489B4;\n}\n.panel-success > h3.panel-title {\n  background: #DFF0A4;\n}\n/*\ninput[type=submit] {\n\tfloat: right;\n\tposition: relative;\n\tpadding: 7px 15px;\n\tleft: 0px;\n\tborder: 2px solid #207cca;\n\tbackground-color: #207cca;\n\tcolor: white;\n}\n input[type=search],\ninput[type=email],\ninput[type=text],\ninput[type=password],\ntextarea {\n\twidth: 100%;\n\tpadding: 8px 15px;\n\tbackground: rgba(239, 240, 242, 0.4);\n  border: 1px solid black;\n\n}\ndiv {\n//\toverflow: hidden;\n\tpadding-right: 0em;\n}\n*/\n\n#newuser {\n\ttext-align: right;\n\tcolor: #3F5388;\n\tpadding: 10px;\n\tline-height: 1em;\n\tmargin: 0px 10px;\n\ttext-transform: uppercase;\n}\n#newuser a {\n\ttext-decoration: none;\n}\n#dashtop {\n\tbackground-color: #333C45;\n}\n#login {\n\tbackground-color: #ECC64B;\n}\nlabel[for=\"rememberme\"] {\n\tmargin: 0px 20px;\n}\n#bills {\n\tbackground-color: #99CCCC;\n}\n#testimony {\n\tbackground-color: #0A9DA5;\n}\n#lawmakers {\n\tbackground-color: #364F8A;\n}\n#topics {\n\tbackground-color: #8CAC8C;\n}\n.billmain {\n\twidth: 79%;\n\theight: 100%;\n\tbackground-color: white;\n\tfloat: left;\n\tmargin: 1 0 ;\n\tposition: relative;\n}\n/*\n\ninput {\n  font: normal 12px/1.3 'helvetica neue', helvetica, arial;\n  font-size: 20px;\n  padding: 5px 10px;\n  border-radius: 10px;\n  border: solid 1px #555;\n  float: left;\n  margin-right: 10px;\n  margin-left: 10px;\n  margin-bottom: 15px;\n  }\n  \n  */\n.btn {\n  margin: 10px 5px 10px 5px;\n  padding: 5px 10px;\n  border-radius: 10px;\n  border: solid 1px #666;\n  display: block;\n  float: left;\n  cursor: pointer;\n  }\n.btn:hover {\n  background-color: #222222;\n  color: #ded2d2;\n  }\n/*\n.list {\n  clear: both;\n  }\n.activebills {\n\tborder: 1px solid black;\n\tborder-radius: 10px;\n\tpadding: 10px 10px;\n\theight: 125px;\n\tmargin: 10px 0px 5px 10px;\n\tbackground-color: #EFF0F2;\n}\n\n.activebills p {\n\tfont-size: 1.8rem;\n\ttext-transform: uppercase;\n\tfont-style: italic;\n}\n*/\n#position label {\n  padding:7px;\n  font-weight: 200;\n  margin: 3px 30px;\n}\n\n#position li {\n  display: inline;\n  font: normal 12px/1.3 'helvetica neue', hevetica, arial;\n  font-size: 20px;\n}\n#position input[type=radio] {\n  border: 20px;\n  width: 24px;\n  height: 24px;\n  margin: 12px;\n}\n\n.billimage {\n\tbackground-image: url(\"../images/billpage.png\");\n\tposition: relative;\n\twidth: 85px;\n\theight: 70px;\n\tfloat: left;\n\tmargin: 0px 5px 0px 0px;\n\tborder: 1px solid gray;\n}\nspan.billimage  {\n\tfont-size: 1.5em;\n\tfont-family: 'Source Sans Pro', Helvetica, sans-serif;\n\tfont-weight: bold;\n\tline-height: 70px;\n\tpadding: 0px 5px;\n\ttext-align: center;\n}\n/* .lastaction {\n\tpadding: 0px 0px 5px 0px;\n  font-size: 2.2rem;\n} */\n.billsummary {\n\tfont-size: 2.2rem;\n\tline-height: 2.2rem;\n\tpadding:10px;\n}\n.lawmaker {\n\tposition: relative;\n\twidth: 100%;\n}\n.lawmaker > div {\n\theight: 250px;\n  \tposition: absolute;\n  \twidth: 250px;\n}\n.leg_img {\n\tposition: relative;\n\twidth: 100%;\n\tz-index: auto;\n}\n.leg_img h2 {\n\tposition: absolute;\n    left: 0;\n    width: 100%;\n}\nh2 span {\n   color: white;\n   font: bold 24px/45px Helvetica, Sans-Serif;\n   letter-spacing: -1px;\n   background: rgb(0, 0, 0); /* fallback color */\n   background: rgba(0, 0, 0, 0.7);\n   padding: 10px;\n}\n\n/*\n\nStyles for comments\n\n*/\n/*\n.pro h3, .neutral h3, .anti h3 {\n\tcolor: black;\n\ttext-transform: uppercase;\n\tfont-size: 1.2em;\n\tline-height: 1.5em;\n\ttext-align: center;\n}\n.pro {\n\tfloat: left;\n\twidth: 32%;\n\tborder-right: 1px dashed black;\n\tpadding-right: 5px;\n\tmin-height: 1px;\n\tline-height: 1.2em;\n}\n.neutral {\n\tfloat: left;\n\twidth: 32%;\n\tborder-right: 1px dashed black;\n\tpadding-left: 5px;\n\tpadding-right: 5px;\n\tmin-height: 1px;\n\tline-height: 1.2em;\n}\n.anti {\n\tfloat: left;\n\twidth: 31%;\n\tpadding-left: 5px;\n\tmin-height: 1px;\n\tline-height: 1.2em;\n} */\n.detailBox {\n    border:1px solid #bbb;\n    margin:5px;\n}\n.titleBox {\n    background-color:#fdfdfd;\n    padding:10px;\n    text-align: center;\n    text-transform: uppercase;\n}\n.titleBox label{\n  color:#444;\n  margin:0;\n  display:inline-block;\n  \n}\n.commentList {\n    padding:0;\n    list-style:none;\n    overflow:visible;\n}\n.commentList li {\n    margin:0;\n    margin-top:10px;\n}\n.commentList li > div {\n    display:table-cell;\n}\n.commenterImage {\n    width:30px;\n    margin-right:5px;\n    height:100%;\n    float:left;\n}\n.commenterImage img {\n    width:100%;\n    border-radius:50%;\n}\n.commenterName p {\n    margin:0 5px;\n    color: blue;\n}\n.commentText p {\n    margin:0;\n    clear: left;\n}\n.sub-text {\n    color:#aaa;\n    font-family:verdana;\n    font-size:11px;\n    margin:0 5px;\n}\n.actionBox {\n    border-top:1px dotted #bbb;\n    padding:10px;\n}\n\n\n/*\n.comments {\n  border-radius: 10px;\n\twidth: 50%;\n\theight: 100%;\n\tpadding: 5px 0px 5px 5px;\n}\n.commentbox input[type=radio] {\n\tmargin: 0px 5px 0px 0px;\n\tdisplay: inline-block;\n\twidth: 20px;\n\theight: 25px;\n}\n.commentbox label {\n\twidth: auto;\n\theight: auto;\n\tfloat: left;\n\tmargin: 0px 10px 10px 0px;\n\tfont-size: 1.8em;\n\ttext-align: center;\n\tline-height: 20px;\n\tvertical-align: baseline;\n}\n.comments span {\n\tcolor: blue;\n\ttext-transform: uppercase;\n\tfont-size: 1.2em;\n\tline-height: 1.5em;\n}\n\n.prolabel {\n\tbackground-size: 20px;\n\twidth: 20px;\n\theight: 25px;\n\tbackground-repeat: no-repeat;\n\tposition: relative;\n}\n.antilabel {\n\twidth: 20px;\n\theight: 25px;\n\tbackground-size: 20px;\n\tbackground-repeat: no-repeat;\n\tposition: relative;\n}\n*/\n\n.footer {\n\twidth: 100%;\n\theight: 100%x;\n\tbackground-image: url(\"../images/topo.png\");\n\tbackground-repeat: repeat;\n\tbackground-color: #F5FDE3;\n\tclear: both;\n}\n#cc {\n\tpadding: 10px;\n\tfloat: left;\n\tvertical-align: top;\n\twidth: 40%;\n\tline-height: 1rem;\n}\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n    <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n                    aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n                <a class=\"navbar-brand\" href=\"#\"> ${router.title}</a>\n            </div>\n            <div id=\"navbar\" class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav\">\n                    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n                        <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\n                    </li>\n                </ul>\n            </div>\n            <!--/.nav-collapse -->\n        </div>\n    </nav>\n</template>"; });
define('text!BillDetails/billDetails.html', ['module'], function(module) { module.exports = "<template>Bill Details\n\n\n<div class=\"panel panel-default\">\n            <div class=\"panel-body\">\n              \n              <div><span class=\"billimage\"><a href=\"/bills/${bill.name}\">${bill.name}</a></span></div>\n              <div class=\"lastaction\">Last Update: ${bill.updated_at}</div>\n              <div class=\"billsummary\">${bill.title}</div>\n\n              <input type=\"text-area\" value.bind=\"bill.comment\" />\n              <button click.delegate=\"postComment(bill, bill.comment)\">Click Me</button>\n                <ul>\n                  <li repeat.for=\"comment of bill.comments\">\n                    ${comment}\n                  </li>\n                </ul>\n            </div>\n</div>\n\n</template>"; });
define('text!Home/home.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"row\">\n    <div if.bind=\"!loaded\" style=\"text-align:center; font-size:20px;\"><i class=\"fa fa-spinner fa-spin fa-3x fa-fw\" aria-hidden=\"true\"></i></div>\n\n    <!-- Sort and filter bills -->\n    <div id=\"billsSort\">\n      \n      <div class=\"col-md-5\">\n        <div class=\"search-filter\">\n        <div class=\"input-group input-group-lg\">\n          <span class=\"input-group-addon\" id=\"basic-addon1\">¿</span>\n          <input class=\"search form-control\" type=\"text\" placeholder=\"Search bill summaries\" />\n        </div>\n        <div class=\"input-group\" aria-label=\"Sort and filter bills\">\n          <button type=\"button\" class=\"sort btn btn-default\" data-sort=\"billsummary\">Sort by name</button>\n          <button type=\"button\" class=\"btn btn-default\" id=\"filter-none\">Show all</button>\n          <button type=\"button\" class=\"btn btn-default\" id=\"filter-senate\">Only show Senate bills</button>\n          <button type=\"button\" class=\"btn btn-default\" id=\"filter-house\">Only show House bills</button>\n        </div>\n      </div>\n      <div class=\"list\">\n        \n        <div if.bind=\"loaded\" class=\"panel panel-default\" style=\"height:300px;\" repeat.for=\"bill of bills\">\n          \n          \n            <div class=\"panel-body\">\n              \n              <div><span class=\"billimage\"><a href=\"/bills/${bill.id}\">${bill.id}</a></span></div>\n              <div class=\"lastaction\">Last Update: ${bill.updated_at}</div>\n              <div class=\"billsummary\">${bill.title}</div>\n\n              <input type=\"text-area\" value.bind=\"bill.comment\" />\n              <button click.delegate=\"postComment(bill, bill.comment)\">Click Me</button>\n                <ul>\n                  <li repeat.for=\"comment of bill.comments\">\n                    ${comment}\n                  </li>\n                </ul>\n           \n          </div>\n          </div>\n          </div>\n          </div>\n          </div>\n          </div>\n    \n    \n          \n          \n          \n          \n            \n                  \n      <!--\n\n                \n                <div class=\"row\">\n\n                  <div class=\"col-md-4\">\n                    <div class=\"detailBox\">\n                      <div class=\"titleBox\">\n                        <label>Proponents</label>\n                      </div>\n                     <div class=\"actionBox\">\n                      <ul class=\"yea commentList\">\n                      {% if bill.comments %}\n                        {% for comment in bill.comments %}\n                          {% if comment.comment_type == \"yea\" %}\n                            <li>\n                              <span class=\"commentText\">\n                              <p>{{ comment.body }}</p>\n                              </span>\n                              <span class=\"commenterName\">\n                                <p>{{ comment.commenter.username }}</p>\n                              </span>\n                              <span class=\"date sub-text\">{{ comment.timestamp.strftime('%Y-%m-%d') }}\n                              </span>\n                            </li>\n                          {% endif %}\n                        {% endfor %}\n                      {% endif %}\n                      </ul>\n                    </div>\n                  </div>\n                </div>\n                \n                  <div class=\"col-md-4\">\n                    <div class=\"detailBox\">\n                      <div class=\"titleBox\">\n                        <label>Neutral</label>\n                      </div>\n                     <div class=\"actionBox\">\n                      <ul class=\"neutral commentList\">\n                      {% if bill.comments %}\n                        {% for comment in bill.comments %}\n                          {% if comment.comment_type == \"neutral\" %}\n                              <li>\n                              <span class=\"commentText\">\n                              <p>{{ comment.body }}</p>\n                              </span>\n                              <span class=\"commenterName\">\n                                <p>{{ comment.commenter.username }}</p>\n                              </span>\n                              <span class=\"date sub-text\">{{ comment.timestamp.strftime('%Y-%m-%d') }}\n                              </span>\n                            </li>\n                            {% endif %}\n                        {% endfor %}\n                      {% endif %}\n                      </ul>\n                    </div>\n                  </div>\n                </div>\n                \n                  <div class=\"col-md-4\">\n                    <div class=\"detailBox\">\n                      <div class=\"titleBox\">\n                        <label>Opponents</label>\n                      </div>\n                     <div class=\"actionBox\">\n                      <ul class=\"nay commentList\">\n                      {% if bill.comments %}\n                        {% for comment in bill.comments %}\n                          {% if comment.comment_type == \"nay\" %}\n                              <li>\n                              <span class=\"commentText\">\n                              <p>{{ comment.body }}</p>\n                              </span>\n                              <span class=\"commenterName\">\n                                <p>{{ comment.commenter.username }}</p>\n                              </span>\n                              <span class=\"date sub-text\">{{ comment.timestamp.strftime('%Y-%m-%d') }}\n                              </span>\n                            </li>\n                            {% endif %}\n                        {% endfor %}\n                      {% endif %}\n                      </ul>\n                    </div>\n                  </div>\n                </div>\n              </div> <!-- close comment area -->\n              \n    <!--          <div class=\"form-group\">\n                  <form role=\"form\" id=\"comment-{{ bill.bill_id|replace(\" \",\"\") }}\" class=\"commentForm\">\n                    <input type=\"hidden\" name=\"csrf_token\" value=\"{{ csrf_token() }}\" />\n                    <input type=\"hidden\" name=\"bill_num\" value=\"{{ bill.bill_name }}\" />\n                    {{ comment_form.comment(rows=\"4\", placeholder=\"Write comments or testimony here, select pro, neutral or anti, and press Submit.\", class=\"form-control\") }}\n                    <div class=\"form-group\">{{ comment_form.position(class=\"radio-inline\", type=\"radio\") }}\n                      <button id=\"submitcomment\" type=\"submit\" class=\"btn btn-default\">Add testimony</button></div>\n                  </form>\n              </div>\n              \n              </div>\n            </div> <!-- close a bill box -->\n    \n    \n\n</template>"; });
define('text!About/about.html', ['module'], function(module) { module.exports = "<template>About</template>"; });
define('text!Lawmakers/lawmakers.html', ['module'], function(module) { module.exports = "<template>Lawmakers\n\n\n\n</template>"; });
define('text!Topics/topics.html', ['module'], function(module) { module.exports = "<template>Topics</template>"; });
//# sourceMappingURL=app-bundle.js.map