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
        ];
    if(questionnaire){
        var sorted_control_result = []

        _.each(control_result, function(ctrl){
            var isAddedEl=false;
            _.each(questionnaire, function(quest){
                if(ctrl.question_id == quest.question_id){
                    isAddedEl = true;
                    sorted_control_result.push(quest);
                }
            });
            if(!isAddedEl){
                sorted_control_result.push(ctrl);
            }
        });

        _.each(sorted_control_result, function(cntrl) {
            var color = "";
            if(onQuestionnairePage){
                if (cntrl.result==1) {
                    color = "rating-circle-blue";
                } else if (cntrl.result==2) {
                    color = "rating-circle-yellow";
                } else if (cntrl.result==3) {
                    color = "rating-circle-red";
                }
                html += '<div class="question-page question-page__question js-question" data-id="' + cntrl.question_id + '">\
                         <div class="' + color + '">' + cntrl.question_id + '</div>\
                         </div>';
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

Handlebars.registerHelper('displayQuestionsErrors', function(question) {
    // "err":[1, 3, 8, 12],
    var html = '<table width="100%">\
        <tr>\
            <td>\
                <input type="checkbox" id="chk1" data-id="1"><label for="chk1">Ошибка 1</label>\
            </td>\
            <td>\
                <input type="checkbox" id="chk4" data-id="4"><label for="chk4">Ошибка 4</label>\
            </td>\
        </tr>\
        <tr>\
            <td>\
                <input type="checkbox" id="chk2" data-id="2"><label for="chk2">Ошибка 2</label>\
            </td>\
            <td>\
                <input type="checkbox" id="chk5" data-id="5"><label for="chk5">Ошибка 5</label>\
            </td>\
        </tr>\
        <tr>\
            <td>\
                <input type="checkbox" id="chk3" data-id="3"><label for="chk3">Ошибка 3</label>\
            </td>\
            <td>\
                <input type="checkbox" id="chk6" data-id="6"><label for="chk6">Ошибка 6</label>\
            </td>\
        </tr>\
    </table>';
    html = $.parseHTML(html);

    return new Handlebars.SafeString(html[0].outerHTML);
});

Template.questionnaire.events({
    'click .js-question': function(e){
        var $el = $(e.currentTarget),
            question;
        
        $('.js-question-error input[type=checkbox]').prop('checked', false);

        question = _.find(this.srvyr.control_result, function(el){
            return el.question_id == $el.data('id');
        });

        if(question && question.err){
            _.each(question.err, function(error){
                if(error){
                    $('#chk'+error).prop('checked', true);
                }
            });
        }
    },
    'change input[type=checkbox]': function(e){
        var $el = $(e.currentTarget),
            question,
            result_arr;

        question = _.find(this.srvyr.control_result, function(el){
            return el.question_id == $el.data('id');
        });

        if( (question && !question.err) ||
            (question && question.err && question.err.length == 0) ){
            if($el.prop('checked')){
                question.err.push($el.data('id'));
            }
        } else if(question && question.err) {
            question.err = _.without(question.err, $el.data('id'));
        }

        console.log(question.err);

    }
});

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

