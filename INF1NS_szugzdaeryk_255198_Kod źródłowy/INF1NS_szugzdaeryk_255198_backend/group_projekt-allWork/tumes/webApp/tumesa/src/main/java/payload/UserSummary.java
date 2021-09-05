/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package payload;

/**
 *
 * @author eszug
 */
public class UserSummary {
    private Long id;
    private String login;
    private String firstName;

    public UserSummary(Long id, String login, String firstName) {
        this.id = id;
        this.login = login;
        this.firstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String Login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }
}

