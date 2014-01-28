Router.configure({ 
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});
Router.map(function() {
    this.route('main', { 
        path: '/',
        template: 'main',
        waitOn: function() {
            return [
                Meteor.subscribe("shops"),
                Meteor.subscribe("questionnaires"),
                Meteor.subscribe("brigadir_result"),
                Meteor.subscribe("users")
            ]
        },
        data: function() {
            return {
                shops: function() {
                    var srvyr = Session.get('srvyr');
                    if(Session.get('day')){
                        //тут получим анкеты из которых возмем ids shop
                        var shop_ids = _.pluck(Questionnaires.find({'day': Session.get('day')}, {}).fetch(), 'shop_id'),
                        shop_obj_arr = [];
                        _.each(shop_ids, function(value){
                                shop_obj_arr.push({
                                id: value
                            });
                        });
                        return Shops.find( { $or: shop_obj_arr }, {});
                    } else {
                        return Shops.find({}, {});
                    }
                },
                date: Questionnaires.find({},{}),
                quest_srvyr: function(){
                    if(Session.get('day') && Session.get('shop')){
                        return Questionnaires.find({
                        shop_id: parseInt(Session.get('shop')),
                        day: Session.get('day')
                    },{});
                    } else {
                        return Questionnaires.find({},{});
                    }
                },
                questionnaries: function() {
                    return Questionnaires.find();
                },
                brigadir_result: function() {
                    return Brigadir_result.find();
                },
                questions: function() {
                    return Questions.find();
                },
                question: function(){
                    if(Session.get('day') && Session.get('shop') && Session.get('quest_srvyr')){
                        return Questionnaires.find({
                            shop_id: parseInt(Session.get('shop')),
                            day: Session.get('day'),
                            srvyr: Session.get('quest_srvyr')
                        }).fetch();
                    }
                }
            }
        }
    });

    this.route('questionnaire', { 
        path: '/questionnaires/:sbj_num',
        template: 'questionnaire',
        waitOn: function() {
            return [
                Meteor.subscribe("shops"),
                Meteor.subscribe("questionnaires"),
                Meteor.subscribe("brigadir_result"),
                Meteor.subscribe("users")
            ]
        },
        data: function() {
            return {
                shop: Shops.findOne({id:+Session.get('shop')}),
                srvyr: Questionnaires.findOne({sbj_num: this.params.sbj_num})
            }
        }
    });
    this.route('control_result', { 
        path: '/control_result',
        template: 'control_result',
        waitOn: function() {
            return [
                Meteor.subscribe("shops"),
                Meteor.subscribe("questionnaires"),
                Meteor.subscribe("brigadir_result"),
                Meteor.subscribe("users")
            ]
        },
        data: function() {
            return {
                questionnaries: function() {
                    return Questionnaires.find();
                },
                questionnairesInMyTeam: function() {
                    return Questionnaires.find({})
                }
            }
        }
    });

    this.route('users', { 
        path: '/users',
        template: 'users',
        waitOn: function() {
            return [
                Meteor.subscribe("shops"),
                Meteor.subscribe("questionnaires"),
                Meteor.subscribe("brigadir_result"),
                Meteor.subscribe("users")
            ]
        },
        data: function() {
            return {
                users: function() {
                    return Meteor.users.find();
                }
            }
        }
    });

    this.route('notFound', {
        path: '*',
        template: 'notFound'
    });
});

Handlebars.registerHelper('myUser', function() {
    return Meteor.user();
});