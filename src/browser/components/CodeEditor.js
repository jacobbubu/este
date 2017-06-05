// flow
import React from 'react';
import MonacoEditor from './ReactMonacoEditor';
import { Box } from '../../common/components';

class EsteCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: [
        '// type here for coding...',
      ].join('\n'),
    };
  }

  // onChange = (newValue, e) => {
  //   // console.log('onChange', newValue, e);
  // }

  editorDidMount = (editor, monaco) => {
    const { editorDidMount } = this.props;
    // editor.executeCommand('source', editor.Handler.SelectAll);
    // console.log('---', !!editor.coreEditingCommands)
    if (editorDidMount) {
      editorDidMount(editor, monaco);
    }
  }

  render() {
    const { language, codeTheme, width, height, readOnly, code } = this.props;
    const { typography } = this.context.theme;
    const fontSize = typography.fontSize(0);

    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: readOnly || false,
      cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <Box
        width={width || 30}
        height={height || 20} >
        <MonacoEditor
          requireConfig={{
            url: 'assets/require.min.js',
            paths: {
              vs: 'assets/vs',
            },
          }}
          language={language || 'javascript'}
          value={code || this.state.code}
          options={options}
          onChange={this.props.onChange}
          editorWillMount={this.props.editorWillMount}
          editorDidMount={this.editorDidMount}
          theme={codeTheme || 'vs-dark'}
          fontSize={fontSize}
          fontWeight={'lighter'}
          lineNumbersMinChars={3}
        />
      </Box>
    );
  }
}

EsteCodeEditor.contextTypes = {
  theme: React.PropTypes.object,
};

export default EsteCodeEditor;
