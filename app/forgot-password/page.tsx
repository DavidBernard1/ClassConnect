export default function ForgotPasswordPage() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="brand-block" style={{justifyContent:'center', marginBottom:20}}>
          <div className="brand-logo"><img src="/logo.svg" alt="DavidNet Technologies" /></div>
          <span>ClassConnect</span>
        </div>
        <h2 style={{marginTop:0, textAlign:'center'}}>Reset password</h2>
        <form className="form-grid" method="post" action="/api/auth/forgot-password">
          <div className="field"><label>Email address</label><input type="email" name="email" required /></div>
          <button className="btn primary" type="submit">Send reset link</button>
        </form>
      </div>
    </div>
  );
}
