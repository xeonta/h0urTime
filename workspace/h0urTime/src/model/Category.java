package model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "category")
public class Category {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int categoryid;
	
	private String name;
	private String color;
	
	public Category() {
		
	} 
	
	public Category(String name, String color) {
		this.name = name;
		this.color = color;
	} 
	
	public Category(int categoryid, String name, String color) {
		this.categoryid = categoryid;
		this.name = name;
		this.color = color;
	} 
	
	public void setCategoryid(int l) {
		this.categoryid = l;
	}
	
	public int getCategoryid() {
		return categoryid;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getColor() {
		return color;
	}
	
	public void setColor(String color) {
		this.color = color;
	}
	
}
