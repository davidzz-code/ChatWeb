import java.io.Serializable;

public class Missatge implements Serializable{
	private int id;
	private String emisor;
	private String receptor;
	private String text;
	
	public void getMissatge() {
		ConnectionDB conDB = new ConnectionDB();
		conDB.connectar();
		conDB.nextMissatge(this);
		conDB.close();
	}
	
	public void guardar() {
		ConnectionDB conDB = new ConnectionDB();
		conDB.connectar();
		conDB.saveMessage(this);
		conDB.close();
	}

	
	//Getters i Setters
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmisor() {
		return emisor;
	}

	public void setEmisor(String emisor) {
		this.emisor = emisor;
	}

	public String getReceptor() {
		return receptor;
	}

	public void setReceptor(String receptor) {
		this.receptor = receptor;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	
}
