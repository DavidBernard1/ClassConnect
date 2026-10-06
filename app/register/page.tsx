export default function RegisterPage() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="brand-block" style={{justifyContent:'center', marginBottom:20}}>
          <div className="brand-logo"><img src="/logo.svg" alt="DavidNet Technologies" /></div>
          <span>ClassConnect</span>
        </div>
        <h2 style={{marginTop:0, textAlign:'center'}}>Create your account</h2>
        <form className="form-grid" method="post" action="/api/auth/register">
          <div className="field"><label>Name</label><input name="name" required /></div>
          <div className="field"><label>Username</label><input name="username" required /></div>
          <div className="field"><label>Email</label><input type="email" name="email" required /></div>
          <div className="field"><label>Phone</label><input type="tel" name="phone" required /></div>
          <div className="field"><label>Password</label><input type="password" name="password" required /></div>
          <div className="field"><label>Confirm password</label><input type="password" name="confirmPassword" required /></div>
          <button className="btn primary" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
