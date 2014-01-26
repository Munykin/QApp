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

Template.control_result.events({
    'click .js-without-err': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        parent_el.removeClass('panel-warning');
        parent_el.addClass('panel-info');
        // this.questionnaries.update(,{
        //     'question_id': question_id, 
        //     'result': '1'
        //     })
    },
    'click .js-not-checked': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        parent_el.removeClass('panel-info');
        parent_el.removeClass('panel-warning');
    },
    'click .js-with-err': function(e){
        var el = e.currentTarget,
            parent_el = $(el).parents('.js-question'),
            question_id = parent_el.data('id'),
        qutpl = questionnaries_tpl;
        parent_el.removeClass('panel-info');
        parent_el.addClass('panel-warning');
        // if(this.questionnaries.find({'timeid': $('js-timeid').val()}).fetch().length){
        //     this.questionnaries.update(,{
        //             'question_id': question_id, 
        //             'result': '2'
        //         })
        // } else {
        //     qutpl = _.extend(qutpl, {
        //         'timeid': $('js-timeid').val()
        //         "questions":[
        //             {
        //                 'question_id': question_id,
        //                 'result': '2'
        //             }
        //     })
        //     this.questionnaries.insert(qutpl);
        // }

    }
})