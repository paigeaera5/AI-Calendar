declare module 'react-google-login' {
    import * as React from 'react';
  
    interface GoogleLoginProps {
      clientId: string;
      buttonText: string;
      onSuccess: (response: any) => void;
      onFailure: (response: any) => void;
      cookiePolicy?: string;
      // Add other props as needed
    }
  
    export class GoogleLogin extends React.Component<GoogleLoginProps, any> {}
  }
  