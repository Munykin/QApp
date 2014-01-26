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

Handlebars.registerHelper('getHeaderQuestions', function(questionnaire) {
    var html = '',
        questions = [
            {
                "question_id":"1",
                "time":0
            },
            {
                "question_id":"2", 
                "time":0
            },
            {
                "question_id":"3", 
                "time":0
            },
            {
                "question_id":"4", 
                "time":0
            },
            {
                "question_id":"5", 
                "time":0
            },
            {
                "question_id":"6", 
                "time":0
            },
            {
                "question_id":"7", 
                "time":0
            },
            {
                "question_id":"8", 
                "time":0
            },
            {
                "question_id":"9", 
                "time":0
            },
            {
                "question_id":"10", 
                "time":0
            },
            {
                "question_id":"11", 
                "time":0
            },
            {
                "question_id":"12", 
                "time":0
            },
            {
                "question_id":"13", 
                "time":0
            },
            {
                "question_id":"14", 
                "time":0
            },
            {
                "question_id":"15", 
                "time":0
            },
            {
                "question_id":"16", 
                "time":0
            },
            {
                "question_id":"17", 
                "time":0
            },
            {
                "question_id":"18", 
                "time":0
            },
            {
                "question_id":"19", 
                "time":0
            },
            {
                "question_id":"20", 
                "time":0
            }
        ];

    if (questionnaire) {
        questions = _.extend(questions, questionnaire.fetch()[0].questions);
        
        _.each(questions, function(qtns) {
            html += '<th>' + qtns.question_id + '</th>';
        });
        return new Handlebars.SafeString(html);
    }
});

Handlebars.registerHelper('getQaQuestions', function(questionnaire) {
    var html = '';

    if(questionnaire){
        _.each(questionnaire.fetch()[0].questions, function(qtns) {
            var color = "blue";
            if (qtns.control_result==1) {
                color = "blue";
            } else if (qtns.control_result==2) {
                color = "yellow";
            } else if (qtns.control_result==3) {
                color = "red";
            }
            html += '<td><div class="rating-circle-' + color + '"></div></td>';
        })
        return new Handlebars.SafeString(html);
    }
});

Template.main.date = function(){
    return Questionnaires.find({},{});
}

Template.main.quest_srvyr = function(){
    if(Session.get('day') && Session.get('shop')){
        return Questionnaires.find({
            shop_id: parseInt(Session.get('shop')),
            day: Session.get('day')
        },{});
    } else {
        return Questionnaires.find({},{});
    }
}

Template.main.question = function(){
    if(Session.get('day') && Session.get('shop') && Session.get('quest_srvyr')){
        return Questionnaires.find({
            shop_id: parseInt(Session.get('shop')),
            day: Session.get('day'),
            srvyr: Session.get('quest_srvyr')
        },{});
    }
}

Template.main.events({
    'click .js-sendmsg': function(){
        var object = {};
        object.user = Meteor.user().emails[0].address;
        object.message = $('#message').val();
        Messages.insert(object);
    },
    'click #day': function(e){
        var el = e.currentTarget;
        Session.set('day', $(el).val());
    },
    'click #shop': function(e){
        var el = e.currentTarget;
        Session.set('shop', $(el).val());
    },
    'click #quest_srvyr': function(e){
        var el = e.currentTarget;
        Session.set('quest_srvyr', $(el).val());
    }
});