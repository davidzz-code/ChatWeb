import java.time.LocalDate;
import java.util.Random;

public class User {
	//Atributs
	private String user;
	private String mail;
	private String pass;
	private String codeCountry;
	private String session;
	private LocalDate lastLog;
	
	
	//Constructors
	public User () {
		
	}
	
	public User (String user, String mail, String pass, String codeCountry) {
		this.setUser(user);
		this.setMail(mail);
		this.setPass(pass);
		this.setCodeCountry(codeCountry);
	}
	
	
	//Metodes
	public boolean register() {
		ConnectionDB conBD = new ConnectionDB();
		conBD.connectar();
		boolean resultat = conBD.insertUser(this);
		conBD.close();
		return resultat;
	}
	
	public void load (String mail) {
		this.setMail(mail);
		
		ConnectionDB conBD = new ConnectionDB();
		conBD.connectar();
		conBD.searchUserByMail(this);
		conBD.close();
	}
	
	public boolean login() {
		boolean resposta = false;
		ConnectionDB conBD = new ConnectionDB();
		conBD.connectar();
		conBD.searchUserByPass(this);
		if (this.getUser()!=null) {
			resposta=true;
			LocalDate lastLog = LocalDate.now();
			this.setLastLog(lastLog);
			
			Random random = new Random();
			String session = "";
			for (int i = 0; i<9;i++) {
				session+=random.nextInt(10);
			}
			this.setSession(session);
			
			String query="UPDATE persona SET last_log='"+this.getLastLog()+"',session='"+this.getSession()+"' WHERE mail='"+mail+"';";
			conBD.updateUser(query);
		}
		conBD.close();
		return resposta;
	}
	
	public boolean isLogged() {
		boolean resposta = false;
		ConnectionDB conDB = new ConnectionDB();
		conDB.connectar();
		
		if (conDB.searchUserBySession(this)) {
			resposta=true;
		}
		
		conDB.close();
		return resposta;
	}
	
	public boolean setFriend(User friend) {
		boolean resposta = false;
		ConnectionDB conDB = new ConnectionDB();
		conDB.connectar();
		if(conDB.insertFriend(this, friend)) {
			resposta=true;
		}
		conDB.close();
		return resposta;
	}
	
	public String getFriends() {
		String resposta = "[]";
		ConnectionDB conDB = new ConnectionDB();
		conDB.connectar();
		resposta = conDB.getFriends(this);
		conDB.close();
		return resposta;
	}

	//Setters i Getters
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getCodeCountry() {
		return codeCountry;
	}

	public void setCodeCountry(String codeCountry) {
		this.codeCountry = codeCountry;
	}	
	
	public void setSession(String session) {
		this.session=session;
	}
	
	public LocalDate getLastLog() {
		return this.lastLog;
	}
	
	public void setLastLog(LocalDate date) {
		this.lastLog=date;
	}
	
	public String getSession() {
		return this.session;
	}
}