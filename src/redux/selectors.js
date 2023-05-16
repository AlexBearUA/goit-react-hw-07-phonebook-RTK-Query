// import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = state => state.filter.filter;

// export const selectVisibleContacts = createSelector(
//   [selectConatcts, selectFilter],
//   (contacts, filter) => {
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   }
// );
