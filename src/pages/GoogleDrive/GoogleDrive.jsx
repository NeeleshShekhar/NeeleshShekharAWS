import React, { useState, useEffect } from 'react';

const GoogleDrive = () => {
  const [driveFiles, setDriveFiles] = useState([]);

  useEffect(() => {
    // Function to load Google Drive API client
    const loadDriveApi = () => {
      gapi.client.load('drive', 'v3', () => {
        // Fetch files from Google Drive
        gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': 'nextPageToken, files(id, name)'
        }).then((response) => {
          const files = response.result.files;
          if (files && files.length > 0) {
            setDriveFiles(files);
          } else {
            console.log('No files found.');
          }
        });
      });
    };

    // Load Google Drive API client
    loadDriveApi();
  }, []);

  return (
    <div>
      <h1>Google Drive Files</h1>
      <ul>
        {driveFiles.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleDrive;