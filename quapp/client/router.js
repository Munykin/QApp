Router.configure({ layoutTemplate: 'layout' });
Router.map(function() {
    this.route('main', { 
        path: '/',
        template: 'main' 
    });
});