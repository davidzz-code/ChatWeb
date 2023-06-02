import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.ZoneId;

import org.json.JSONArray;
import org.json.JSONObject;

public class ConnectionDB {
	//Atributs
	private Connection conn;
	private Statement st;
	
	//Constructors
	public ConnectionDB() {
		this.setConn(null);
		this.setSt(null);
	}
	
	//Mètodes
	public boolean connectar() {
		boolean proces = true;
		try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    } catch (ClassNotFoundException error) {
	        System.out.println("Error al cargar el driver JDBC de MySQL: " + error.getMessage());
	        proces = false;
	    }
		
		try {
			this.conn = DriverManager.getConnection("jdbc:mysql://localhost:3308/xat","root","");
	    } catch (SQLException error) {
	        System.out.println("Error al conectar con el servidor MySQL/MariaDB: " + error.getMessage());
	        proces = false;
	    }
		
	    try {
	    	if (this.conn!=null) {
	    		this.st = this.conn.createStatement();
	    	}
	        
	    } catch (SQLException error) {
	        System.out.println("Error al establecer declaración de conexión MySQL/MariaDB: " + error.getMessage());
	        proces = false;
	    }
	    
	    return proces;
	}
	
	public boolean insertUser(User user) {
		boolean proces = true;
		try {
	    	String query = "INSERT INTO persona (user,mail,pass,country) VALUES ('"+user.getUser()+"','"+user.getMail()+"','"+user.getPass()+"','"+user.getCodeCountry()+"')";
	        st.executeUpdate(query);
	    } catch (SQLException error) {
	        System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
	        proces=false;
	    }
		return proces;
	}
	
	public void searchUserByMail(User u) {
		String query = "SELECT * FROM persona WHERE mail='"+u.getMail()+"';";
		try {
			ResultSet rs = st.executeQuery(query);
			while (rs.next()) {
				u.setUser(rs.getString("user"));
				u.setPass(rs.getString("pass"));
				u.setCodeCountry(rs.getString("country"));
				Date d = rs.getDate("last_log");
				if (d!=null) {
					u.setLastLog(d.toLocalDate());
				}
				
			}
		} catch (SQLException e) {
			System.out.println("Error a searchUser: "+e.getMessage());
		}
	}
	
	public void searchUserByPass(User u) {
		String query = "SELECT * FROM persona WHERE mail='"+u.getMail()+"' AND pass='"+u.getPass()+"';";
		try {
			ResultSet rs = st.executeQuery(query);
			while (rs.next()) {
				u.setUser(rs.getString("user"));
			}
		} catch (SQLException e) {
			System.out.println("Error a searchUser: "+e.getMessage());
		}
	}
	
	public boolean searchUserBySession(User u) {
		boolean resposta = false;
		String query = "SELECT * FROM persona WHERE mail='"+u.getMail()+"' AND session='"+u.getSession()+"';";
		try {
			ResultSet rs = st.executeQuery(query);
			while (rs.next()) {
				u.setUser(rs.getString("user"));
				u.setPass(rs.getString("pass"));
				u.setCodeCountry(rs.getString("country"));
				u.setLastLog(rs.getDate("last_log").toLocalDate());
			}
			if (u.getLastLog().equals(LocalDate.now())) {
				resposta=true;
			}
		} catch (Exception e) {
			System.out.println("Error a searchUserBySession: "+e.getMessage());
		}
		return resposta;
	}
	
	public boolean insertFriend(User u, User friend) {
		boolean resposta = true;
		try {
			String query = "INSERT INTO amistad (mail1,mail2) VALUES ('"+u.getMail()+"','"+friend.getMail()+"')";
			st.executeUpdate(query);
		} catch (SQLException error) {
			System.out.println("Error al ejecutar SQL en servidor MySQL/MariaDB: " + error.getMessage());
			resposta=false;
		}
		return resposta;
	}
	
	public String getCountry() {
		String jsonString = null;
		JSONArray ja = new JSONArray();;

		try {
			String query = "SELECT * FROM paises ORDER BY Pais";
			ResultSet rs = st.executeQuery(query);
			Class.forName("org.json.JSONObject");
			
			while (rs.next()) {
				Country c = new Country();
				c.setCode(rs.getString("Codigo"));
				c.setName(rs.getString("Pais"));
				JSONObject json = new JSONObject(c);
				ja.put(json);
			}
			jsonString = ja.toString();
		} catch (Exception e) {
			System.out.println("Error al getCountry: "+e.getMessage());
		}
		
		return jsonString;
	}
	
	public String getFriends(User u) {
		String jsonString = null;
		JSONArray ja = new JSONArray();;

		try {
			String query = "SELECT mail2 FROM amistad WHERE mail1='"+u.getMail()+"';";
			ResultSet rs = st.executeQuery(query);
			Class.forName("org.json.JSONObject");
			
			while (rs.next()) {
				ja.put(rs.getString("mail2"));
			}
			jsonString = ja.toString();
		} catch (Exception e) {
			System.out.println("Error al getCountry: "+e.getMessage());
		}
		
		return jsonString;
	}
	
	public void updateUser(String query) {
		try {
			st.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error a updateUser: "+e.getMessage());
		}
	}
	
	public void nextMissatge(Missatge sms) {
		String query = "SELECT * FROM message WHERE desti='"+sms.getReceptor()+"';";
		try {
			ResultSet rs = st.executeQuery(query);
			if(rs.next()) {
				sms.setEmisor(rs.getString("origen"));
				sms.setId(rs.getInt("id"));
				sms.setText(rs.getString("text"));
				query = "DELETE FROM message WHERE id="+sms.getId()+";";
				st.executeUpdate(query);
			}
		} catch (SQLException e) {
			System.out.println("Error a nextMissatge: "+e.getMessage());
		}
	}
	
	public void saveMessage(Missatge sms) {
		String query = "INSERT INTO message (origen,desti,text) VALUES ('"+sms.getEmisor()+"','"+sms.getReceptor()+"','"+sms.getText()+"');";
		try {
			st.executeUpdate(query);
		} catch (SQLException e) {
			System.out.println("Error a saveMessage: "+e.getMessage());
		}
	}
	
	public void close() {
		try {
			st.close();
			conn.close();
		} catch (SQLException error) {
			 System.out.println("Error al ejecutar tancar la connexió: " + error.getMessage());
		}	
	}
	
	//Getters i Setters
	public void setConn(Connection conn) {this.conn=conn;}
	public void setSt(Statement st) {this.st=st;}

}
	
