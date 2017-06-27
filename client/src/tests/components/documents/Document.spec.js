import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import Document from '../../../components/document/Document.jsx';

TestWrapper.componentName = 'Document';

const documentDetail = {
  OwnerId: 1,
  permission: 'public',
  title: 'The book of mistery',
  content: 'The content of mistery',
};

const userDetail = {
  UserId: 1,
  fullNames: 'Jude Admin',
  RoleId: 1
};

const deleteDocument = (someDoc) => {
  return Promise.resolve(someDoc);
}

describe('Document Component', () => {
  const wrapper = TestWrapper.mounts(Document,
    { user: userDetail, document: documentDetail, deleteDocument });
  const rendered = TestWrapper.renders(Document,
    { user: userDetail, document: documentDetail }).html();

  describe('When loaded', () => {
    it('should show the title', () => {
      expect(rendered.includes('The book of mistery'));
    });
    it('Should show the view button', () => {
      expect(rendered.includes('<i class="fa fa-eye"></i>')).toBe(true);
    });
    it('Should show a default image', () => {
      expect(rendered.includes('<img src="document.png" alt="document-img">')).toBe(true);
    });
  });

  describe('When user is an admin', () => {
    it('Should show the view button', () => {
      expect(rendered.includes('<i class="fa fa-eye"></i>')).toBe(true);
    });
    it('Should show the edit button', () => {
      expect(rendered.includes('<i class="fa fa-edit"></i>')).toBe(true);
    });

    it('Should show the delete button', () => {
      expect(rendered.includes('i class="fa fa-trash"></i>')).toBe(true);
    });

    it('Should delete by the admin', () => {
      TestWrapper.call().deleteDocument();
      expect(TestWrapper.call().state.displayState).toBe('none');
    });
  });

  describe('When user is the owner', () => {
    userDetail.RoleId = 2;
    userDetail.UserId = 2;
    documentDetail.OwnerId = 2;
      const rendered = TestWrapper.renders(Document,
    { user: userDetail, document: documentDetail }).html();

    it('Should show the view button', () => {
      expect(rendered.includes('<i class="fa fa-eye"></i>')).toBe(true);
    });
    it('Should show the edit button', () => {
      expect(rendered.includes('<i class="fa fa-edit"></i>')).toBe(true);
    });

    it('Should show the delete button', () => {
      expect(rendered.includes('i class="fa fa-trash"></i>')).toBe(true);
    });

    it('Should delete by the owner', () => {
      TestWrapper.call().deleteDocument();
      expect(TestWrapper.call().state.displayState).toBe('none');
    });
  });

  describe('When user is not the owner and its a public document', () => {
    userDetail.RoleId = 2;
    userDetail.UserId = 2;
    documentDetail.OwnerId = 3;
      const rendered = TestWrapper.renders(Document,
    { user: userDetail, document: documentDetail }).html();

    it('Should show the view button', () => {
      expect(rendered.includes('<i class="fa fa-eye"></i>')).toBe(true);
    });
    it('Should hide the edit button', () => {
      expect(rendered.includes('<i class="fa fa-edit"></i>')).toBe(false);
    });

    it('Should hide the delete button', () => {
      expect(rendered.includes('i class="fa fa-trash"></i>')).toBe(false);
    });
  });
});
