Session.set('shop', null);
Session.set('Questionnaires', {});
Session.set('brigadir_result', {});

Handlebars.registerHelper('getDateFormat', function(date) {
    var curDate = new Date(date),
        html = '';

    html += curDate.getHours() + ':';
    html += curDate.getMinutes() + ':';
    html += curDate.getSeconds();
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('getQaQuestions', function(questionnaire, onQuestionnairePage) {
    var html = '',
        control_result = [
            {
                "question_id": "1",
                "err":[],
                "result": "",
            },
            {
                "question_id": "2",
                "err":[],
                "result": "",
            },
            {
                "question_id": "3",
                "err":[],
                "result": "",
            },
            {
                "question_id": "4",
                "err":[],
                "result": "",
            },
            {
                "question_id": "5",
                "err":[],
                "result": "",
            },
            {
                "question_id": "6",
                "err":[],
                "result": "",
            },
            {
                "question_id": "7",
                "err":[],
                "result": "",
            },
            {
                "question_id": "8",
                "err":[],
                "result": "",
            },
            {
                "question_id": "9",
                "err":[],
                "result": "",
            },
            {
                "question_id": "10",
                "err":[],
                "result": "",
            },
            {
                "question_id": "11",
                "err":[],
                "result": "",
            },
            {
                "question_id": "12",
                "err":[],
                "result": "",
            },
            {
                "question_id": "13",
                "err":[],
                "result": "",
            },
            {
                "question_id": "14",
                "err":[],
                "result": "",
            },
            {
                "question_id": "15",
                "err":[],
                "result": "",
            },
            {
                "question_id": "16",
                "err":[],
                "result": "",
            },
            {
                "question_id": "17",
                "err":[],
                "result": "",
            },
            {
                "question_id": "18",
                "err":[],
                "result": "",
            },
            {
                "question_id": "19",
                "err":[],
                "result": "",
            },
            {
                "question_id": "20",
                "err":[],
                "result": "",
            }
        ]
    if(questionnaire){
        console.log(questionnaire);
        control_result = _.extend(control_result, questionnaire.fetch()[0].control_result);
        _.each(control_result, function(cntrl) {
            var color = "";
            if(onQuestionnairePage){
                html += '<div class="question-page question-page__question">' + cntrl.question_id + '</div>';
            } else {
                if (cntrl.result==1) {
                    color = "rating-circle-blue";
                } else if (cntrl.result==2) {
                    color = "rating-circle-yellow";
                } else if (cntrl.result==3) {
                    color = "rating-circle-red";
                }
                html += '<td><div class="' + color + '"></div></td>';
            }
        })
        return new Handlebars.SafeString(html);
    }
});

Template.questionnaire.question = Template.main.question;

Template.main.events({
    'click .js-sendmsg': function(){
        var object = {};
        object.user = Meteor.user().emails[0].address;
        object.message = $('#message').val();
        Messages.insert(object);
    },
    'change #day': function(e){
        var el = e.currentTarget;
        Session.set('day', $(el).val());
    },
    'change #shop': function(e){
        var el = e.currentTarget;
        Session.set('shop', $(el).val());
    },
    'change #quest_srvyr': function(e){
        var el = e.currentTarget;
        Session.set('quest_srvyr', $(el).val());
    },
    'click .js-link-questionnaire': function(e) {
        var element = e.currentTarget;
        if ($(element).data("id")) {
            Router.go('/questionnaires/' + $(element).data("id"));
        }
    }
});

Template.questionnaire.events({
    'change .js-comment': function(e){
        var el = e.currentTarget;
        Session.set('comment', $(el).val());
    },
    'click .js-save': function(){
        if( Session.get('comment') &&
            Session.get('comment') != '' ){
            Questionnaires.update( { _id: this.srvyr._id } , { $set: { comment: Session.get('comment')} } );
            alert('данные сохранены')
        }
    } 
})

