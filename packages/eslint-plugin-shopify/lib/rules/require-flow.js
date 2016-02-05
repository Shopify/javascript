var ALWAYS_MESSAGE = 'You must include a @flow declaration at the top of your file.';
var NEVER_MESSAGE = 'You must not include a @flow declaration in your file.';
var FLOW_REGEX = /@flow/;

function commentIsFlowDirective(comment) {
  return Boolean(comment) && comment.type === 'Block' && comment.start === 0 && FLOW_REGEX.test(comment.value);
}

module.exports = function(context) {
  var config = context.options[0] || 'always';

  return {
    Program: function(node) {
      var commentNode = node.comments && node.comments[0];
      var isFlowDirective = commentIsFlowDirective(commentNode);

      switch (config) {
      case 'always':
        if (!isFlowDirective) {
          context.report(node, ALWAYS_MESSAGE);
        }
        break;

      case 'never':
        if (isFlowDirective) {
          context.report(node, NEVER_MESSAGE);
        }
        break;
      }
    },
  };
};

module.exports.schema = [{
  enum: ['always', 'never'],
}];
