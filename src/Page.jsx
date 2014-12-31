'use-strict';
var React = require('react/addons');
var marked = require('marked');
var EditorToggle = require('./EditorToggle');

marked.setOptions({  
  sanitize: true,
  smartLists: true
});

module.exports = React.createClass({

  displayName: 'Page',

  /**
   * Set default props.
   * @returns {object}
   */
  getDefaultProps: function(){
    return {
      content: '',
      title: '',
      componentType: 'page'
    };
  },

  /**
   * Render a Page component to the screen.
   * @returns {JSX}
   */
  render: function(){   
    return (
      <article className="editable-component">
        <EditorToggle {...this.props}/>
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <section dangerouslySetInnerHTML={{__html: marked(this.props.content)}}></section>       
        {this.props.children}
      </article>
    );
  }
});