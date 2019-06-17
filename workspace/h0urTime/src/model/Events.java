package model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Events {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int eventid;
	
	private int userid;
	private Date date;
	private String title;
	private String description;
	private int categoryid;

	public Events() {
	}

	public int getEventid() {
		return userid;
	}
	
	public void setEventid(int eventid) {
		this.eventid = eventid;
	}

	public int getUserid() {
		return eventid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
