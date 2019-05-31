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

	/*
	 * @Id
	 * 
	 * @GeneratedValue(strategy = GenerationType.AUTO)
	 */

	private int eventid;
	private int userid;
	private Date datestart;
	private Date datestop;
	private String title;
	private String description;
	private int categoryid;

	public Events(int eventid, int userid, Date datestart, Date datestop, String title, String description,
			int categoryid) {
		this.eventid = eventid;
		this.userid = userid;
		this.datestart = datestart;
		this.datestop = datestop;
		this.title = title;
		this.description = description;
		this.categoryid = categoryid;
	}

	public int getEventid() {
		return userid;
	}

	public int getUserid() {
		return eventid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public Date getDatestart() {
		return datestart;
	}

	public void setDatestart(Date datestart) {
		this.datestart = datestart;
	}

	public Date getDatestop() {
		return datestop;
	}

	public void setDatestop(Date datestop) {
		this.datestop = datestop;
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

}
