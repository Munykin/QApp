var questionnaries_tpl = {
                "sbj_num":"",// id из SurveyToGo_id
                "srvyr":"",//интервьюер
                "shop_id":0, //id магазина
                "day": "",//
                "vstart":"",//время начала интервью
                "vend":"",//время окончания интервью
                "timeid":null,// идентификатор для сопоставления с результатами контроля бригадиром
              
                "questions":[//массив вопросов
                  {
                    "question_id": null,
                    "time":null,
                    "err":[], // какие ошибки у вопроса зарегистрированные контролером
                    "result": "0",// (может быть 1-без нарушений, 2-с нарушением, 3-с грубым нарушением)
                  }
                ],

                "control_result":[],
                "audio":"",//аудио файл анкеты
                "rating":0,//общая оценка анкеты
                "comment":""//комментарий к анкете
            };

Template.control_result.rendered = function(){
    var questionnaries = Questionnaires.find({timeid:parseInt($('.js-timeid').val())}).fetch();
    if(questionnaries.length){
        _.each($('.js-question'), function(el){
            _.each(questionnaries.questions, function(quest){
                if($(el).data('id') == quest.question_id){
                    if(quest.result ==1){
                        $(el).addClass('panel-info');
                    } else if(quest.result ==2){
                        $(el).addClass('panel-warning');
                    }
                }
            });
        });
    }
}

Template.control_result.events({
    'change .js-timeid':function(){
        var questionnaries = Questionnaires.find({timeid:parseInt($('.js-timeid').val())}).fetch();
        _.each($('.js-question'), function(el){
            $(el).removeClass('panel-info');
            $(el).removeClass('panel-warning');
        });
        if(questionnaries.length){
            _.each($('.js-question'), function(el){
                _.each(questionnaries[0].questions, function(quest){
                    if($(el).data('id') == quest.question_id){
                        if(quest.result ==1){
                            $(el).addClass('panel-info');
                        } else if(quest.result ==2){
                            $(el).addClass('panel-warning');
                        }
                    }
                });
            });
        }
    },
    'click .js-without-err': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        debugger;
        parent_el.removeClass('panel-warning');
        parent_el.addClass('panel-info');
        var questionnaries = Questionnaires.find({timeid:parseInt($('.js-timeid').val())}).fetch();
        if(questionnaries.length){
            var que = Questionnaires.findOne({timeid:parseInt($('.js-timeid').val())});
            Questionnaires.update({_id: que._id}, {
                $push:{
                    questions:{
                        "question_id": question_id,
                        "time": _.random(0,150),//ЫЫЫЫЫЫЫЫЫ
                        "err":[], // какие ошибки у вопроса зарегистрированные контролером
                        "result": 1// (может быть 1-без нарушений, 2-с нарушением, 3-с грубым нарушением)
                    }
                  }
                });
        } else {
            questionnaries_tpl.questions[0].question_id = question_id;
            questionnaries_tpl.questions[0].timeid = parseInt($('.js-timeid').val());
            questionnaries_tpl.questions[0].result = 1;
            Questionnaires.insert(questionnaries_tpl);
        }
    },
    'click .js-not-checked': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        parent_el.removeClass('panel-info');
        parent_el.removeClass('panel-warning');

        var questionnaries = Questionnaires.find({timeid:parseInt($('.js-timeid').val())}).fetch();
        if(questionnaries.length){
            var que = Questionnaires.findOne({timeid:parseInt($('.js-timeid').val())});
            Questionnaires.update({_id: que._id}, {
                $push:{
                    questions:{
                        "question_id": question_id,
                        "time": _.random(0,150),//ЫЫЫЫЫЫЫЫЫ
                        "err":[], // какие ошибки у вопроса зарегистрированные контролером
                        "result": 5// (может быть 1-без нарушений, 2-с нарушением, 3-с грубым нарушением)
                    }
                  }
                });
        } else {
            questionnaries_tpl.questions[0].question_id = question_id;
            questionnaries_tpl.questions[0].timeid = parseInt($('.js-timeid').val());
            questionnaries_tpl.questions[0].result = 1;
            Questionnaires.insert(questionnaries_tpl);
        }
    },
    'click .js-with-err': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        parent_el.removeClass('panel-info');
        parent_el.addClass('panel-warning');

        var questionnaries = Questionnaires.find({timeid:parseInt($('.js-timeid').val())}).fetch();
        if(questionnaries.length){
            var que = Questionnaires.findOne({timeid:parseInt($('.js-timeid').val())});
            Questionnaires.update({_id: que._id}, {
                $push:{
                    questions:{
                        "question_id": question_id,
                        "time": _.random(0,150),//ЫЫЫЫЫЫЫЫЫ
                        "err":[], // какие ошибки у вопроса зарегистрированные контролером
                        "result": 2// (может быть 1-без нарушений, 2-с нарушением, 3-с грубым нарушением)
                    }
                  }
                });
        } else {
            questionnaries_tpl.questions[0].question_id = question_id;
            questionnaries_tpl.questions[0].timeid = parseInt($('.js-timeid').val());
            questionnaries_tpl.questions[0].result = 2;
            Questionnaires.insert(questionnaries_tpl);
        }
    }
})