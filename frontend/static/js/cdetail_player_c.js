window.cid = window.get_args('cid');

window.usertype = 0;

const type_p = 0;
const type_o = 1;

(function () {
    //PLAYER = 0, ORGANIZER = 1
    $t('/api/c/user_type', 'GET', {},
        function (response) {
            myaccount_c.usertype = response['data'];
        },
        function (response) {
            alert('[' + response.code.toString() + ']' + response.msg);
        }
    );
})();

//api

window.contest = {
    getAttr : function(qname) {
        for (i of this.attr)
            if (i.name == qname)
                return i.content;
        console.log('[err] No such attr');
        return null;
    },
    period : [
        {
            show : true,
            attr : [
                {
                    name : 'name',
                    alias : '阶段名称',
                    type : 'text',
                    content : 'period 1',
                    editable : true
                },
                {
                    name : 'description',
                    alias : '阶段简介',
                    type : 'ltext',
                    content : 'description 1',
                    editable : true
                },
                {
                    name : 'time',
                    alias : '阶段时间',
                    type : 'datetime',
                    content : {
                        sd : '1977-03-11',
                        ed : '1997-05-22',
                        sh : '19',
                        sm : '00',
                        eh : '19',
                        em : '00'
                    },
                    editable : true
                },
                {
                    name : 'slots',
                    alias : '可参与团队数',
                    type : 'number',
                    content : '100',
                    editable : true
                },
                {
                    name : 'p_file',
                    alias : '阶段附件',
                    editable : true,
                    type : 'file',
                    content : {
                        url : '#',
                        filename : 'fuck-zyn.pdf'
                    }
                }
            ]
        }
    ],
    attr : [
        {
            name : 'name',
            alias : '比赛名称',
            type : 'text',
            content : 'contest 1',
            editable : true
        },
        {
            name : 'description',
            alias : '比赛简介',
            type : 'ltext',
            content : "The monks of Turstarkuri watched the rugged valleys below their mountain monastery as wave after wave of invaders swept through the lower kingdoms. Ascetic and pragmatic, in their remote monastic eyrie they remained aloof from mundane strife, wrapped in meditation that knew no gods or elements of magic. Then came the Legion of the Dead God, crusaders with a sinister mandate to replace all local worship with their Unliving Lord's poisonous nihilosophy. From a landscape that had known nothing but blood and battle for a thousand years, they tore the souls and bones of countless fallen legions and pitched them against Turstarkuri. The monastery stood scarcely a fortnight against the assault, and the few monks who bothered to surface from their meditations believed the invaders were but demonic visions sent to distract them from meditation. They died where they sat on their silken cushions. Only one youth survived--a pilgrim who had come as an acolyte, seeking wisdom, but had yet to be admitted to the monastery. He watched in horror as the monks to whom he had served tea and nettles were first slaughtered, then raised to join the ranks of the Dead God's priesthood. With nothing but a few of Turstarkuri's prized dogmatic scrolls, he crept away to the comparative safety of other lands, swearing to obliterate not only the Dead God's magic users--but to put an end to magic altogether.",
            editable : true
        },
        {
            name : 'time',
            alias : '报名时间',
            type : 'datetime',
            content : {
                sd : '1977-03-11',
                ed : '1997-05-22',
                sh : '19',
                sm : '00',
                eh : '19',
                em : '00'
            },
            editable : true
        },
        {
            name : 'team_lim',
            alias : '团队人数limit',
            type : 'interval',
            content : {
                min : '5',
                max : '200'
            },
            editable : true
        },
        {
            name : 'slots',
            alias : '可报名团队数',
            type : 'number',
            content : '100',
            editable : true
        },
        {
            name : 'c_file',
            alias : '比赛附件',
            type : 'file',
            content : {
                url : '#',
                filename : 'fuckzyn.pdf'
            }
        }
    ],
    period_modifier_available : true
};

//api
window.user_id = '2';

window.team = {
    name : '405',
    status : '未报名',
    member : [
        {
            nickname : 'hentaiZYN',
            avatar_url : '../../img/user.png',
            school : 'THU',
            id : '1',
            accept : true,
        },
        {
            nickname : 'o,manGJH',
            avatar_url : '../../img/user.png',
            school : 'THU',
            id : '2',
            accept : true
        }
    ],
    leader_id : '1',
    new_leader : ''
}

header.greeting = contest != null ? contest.getAttr('name') : 'Test.Me';
header.title = '比赛详情';

if (usertype in [0, 1]) {
    header.link_list.push({
        alias : '比赛论坛',
        link : '../forum/index.html?cid=' + window.cid,
        action : empty_f
    });
    header.link_list.push({
        alias : '个人中心',
        link : '../myaccount/index.html',
        action : empty_f
    });
    header.link_list.push({
        alias : '登出',
        link : '#',
        action : function() {
            logout();
        }
    });
} else
    header.link_list.push({
        alias : '登录',
        link : '../index.html',
        action : empty_f
    });

var nav = new Vue({
    el : '#side-nav',
    data : {
        list : [],
        choice : '[null]'
    },
    methods : {
        select : function(target) {
            for (i of this.list)
                if (i == target) {
                    this.choice = target;
                    return;
                }
            console.log('[err] No such item');
        }
    }
});

nav.list = ['队伍信息'];
nav.choice = '队伍信息';

window.show_period = [true];

var info = new Vue({
    el : '#body',
    data : {
        show_basic_info : true,
        show_member : true,
        team : window.team,
        contest : window.contest,
        signup_material : {
            attachment : ''
        }
    },
    computed : {
        page : function() {
            return nav.choice;
        }
    },
    methods : {
        switch_basic_info : function() {
            this.show_basic_info = !this.show_basic_info;
        },
        switch_member : function() {
            this.show_member = !this.show_member;
        },
        t_file_change : function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.signup_material.attachment = files[0].name;
            //api
        },
        switch_period_info : function(idx) {
            this.contest.period[idx].show = !this.contest.period[idx].show;
        },
        get_p_name : function(idx) {
            for (i of this.contest.period[idx].attr)
                if (i.name == 'name')
                    return(i.content);
        },
        is_self : function(id) {
            return window.user_id == id;
        },
        visit_user : function(id) {
            if (this.is_self(id)) {
                //visit myaccount
            } else {
                //guest visit
            }
        },
        switch_team_ownership : function() {
            //api
        },
        save : function() {
            //api
        },
        post : function() {
            //api
        }
    }
});