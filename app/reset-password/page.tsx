export default function ResetPasswordPage() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="brand-block" style={{justifyContent:'center', marginBottom:20}}>
          <div className="brand-logo"><img src="/logo.svg" alt="DavidNet Technologies" /></div>
          <span>ClassConnect</span>
        </div>
        <h2 style={{marginTop:0, textAlign:'center'}}>Set a new password</h2>
        <form className="form-grid" method="post" action="/api/auth/reset-password">
          <input type="hidden" name="token" value="demo-token" />
          <div className="field"><label>New password</label><input type="password" name="password" required /></div>
          <div className="field"><label>Confirm password</label><input type="password" name="confirmPassword" required /></div>
          <button className="btn primary" type="submit">Update password</button>
        </form>
      </div>
    </div>
  );
}
