var React = require('react/addons');
var Q = require('EventQueue');
var _ = require('underscore');

module.exports = React.createClass({
  /**
  * Return a string of classes
  * @return {String}
  */
  getClasses: function(){
    var classes = ['btn'];
    // Add default link-type for action links
    if(this.props.type==='link'){
      classes.push('btn-link');
    }
    // Add all passed in classes
    if(this.props.classes){
      _.each(this.props.classes,function(cla,i){
        classes.push('btn-'+cla);
      });
    }

    return classes.join(' ');
  },

  handleClick: function(){
    console.log('CLICK:'+this.props.name);
    console.log(this.props);
    // TODO: update 'next' with actual 'verbs' for the actions
    Q.push({'entityEvent':'action:next','data':{'page':1}});
  },

  /**
  * Return an <a> (link) template
  * @return {JSX Template}
  */
  getLink: function(){
    return (<a href={this.props.url} key="actionLinkKey" className={this.getClasses()} onClick={this.handleClick} >{this.props.name}</a>);
  },

  /**
  * Return a Button template
  * @return {JSX Template}
  */
  getButton: function(){
    return (<button type="button" id={this.props.id} key="actionButtonKey" className={this.getClasses()}  onClick={this.handleClick} >{this.props.name}</button>);
  },

  /**
  * Determine what action template to return
  * @returns {JSX Template}
  */
  getAction: function(){
    if(this.props.type === 'button'){
      return this.getButton();
    }else{
      return this.getLink();
    }
  },

  /**
   * Render a Action component.
   * @returns {JSX}
   */
  render: function(){ 
    return ( this.getAction() );
  }

});
