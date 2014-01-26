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
    var html = '';

    if(questionnaire){
        _.each(questionari.fetch()[0].questions, function(qtns) {
            html += '<div class="k1-header-col" style="display: inline-block;border-right:1px solid #CCC;height:70px;width:70px;">' + qtns.question_id + '</div>';
        })
        return new Handlebars.SafeString(html);
    }
});

Handlebars.registerHelper('getQaQuestions', function(questionari) {
    var html = '';

    if(questionnaire){
        _.each(questionnaire.fetch()[0].questions, function(qtns) {
            var color = "#FFFFFF";
            if (qtns.control_result==1) {
                color = "#FFFFFF";
            } else if (qtns.control_result==2) {
                color = "#ffe900";
            } else if (qtns.control_result==3) {
                color = "#ff3f00";
            }
            html += '<div style="display: inline-block;border-right:1px solid #CCC;' +
                    'border-bottom:1px solid #CCC;height:70px;width:70px;">' +
                    '<div style="border-radius:100%;background-color' +
                    color + '"></div>' + qtns.question_id + '</div>';
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