import React from 'react';
import TinyMCEInput from 'react-tinymce-input';
import PropTypes from 'prop-types';

const tinyMCEConfig = {
  language: 'en',
  theme: 'modern',
  toolbar: 'bold italic underline strikethrough hr | bullist numlist | link unlink | undo redo | spellchecker code',
  menubar: false,
  statusbar: true,
  resize: true,
  plugins: 'link,spellchecker,paste',
  theme_modern_toolbar_location: 'top',
  theme_modern_toolbar_align: 'left',
};

const DocumentForm =  (props) => (
  <form className="left-alert" onSubmit={props.onSubmit} >
    <div className="row">
      <div className="row margin">
        <div className="input-field col s12">
          <input
            id="title"
            name="title"
            className="validate"
            type="text"
            value={props.title}
            required="required"
            onChange={props.onChange}
          />
          <label className="center-align active">Document Title</label>
        </div>
      </div>

      <div className="row margin">
        <div className="input-field col s12">
          <select
            name="permission"
            required="required"
            id="selectRole"
            onChange={props.onChange}
          >
            <option value="public">Public Access</option>
            <option value="private">Private Access</option>
            <option value="role">My Department</option>
          </select>
          <label
            htmlFor="permission"
            className="center-align"
          >
            Permission
          </label>
        </div>
      </div>

      <TinyMCEInput
        value={props.content}
        tinymceConfig={tinyMCEConfig}
        onChange={props.handleEditorChange}
      />
      <button
        className="waves-effect waves-light btn cyan"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
);

DocumentForm.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleEditorChange: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DocumentForm;
