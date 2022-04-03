package com.examly.springapp;


import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.junit.Test;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class SpringappApplicationTests {

	@Autowired
    private MockMvc mockMvc;
	
	//Get All Trainers
	@Test
	@Transactional
    public void BE_Get_Lawyer() throws Exception {
	 	mockMvc.perform(MockMvcRequestBuilders.get("/Lawyer")
		.contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
		.andReturn();
    }
	
	@Test //Update Trainer
    public void BE_Add_CaseRecord() throws Exception {
        String newCase = "{\"CaseRecordID\":\"CRID001\",\"userId\":\"UID001\",\"date\":\"04.10.2021\",\"eventDetail\":\"Testing\",\"actionTaken\":\"tester\",\"issuedBy\":\"tester1\"}";        
        mockMvc.perform(MockMvcRequestBuilders.post("/Lawyer/Case Record")
		.param("CaseRecordID","CRID001")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newCase)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
	@Test //add Trainer
    public void BE_Update_CaseRecord() throws Exception {
        String newCase = "{\"CaseRecordID\":\"CRID001\",\"userId\":\"UID001\",\"date\":\"04.10.2021\",\"eventDetail\":\"Testing\",\"actionTaken\":\"tester\",\"issuedBy\":\"tester1\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/Lawyer/Case Record")
		.param("CaseRecordID","CRID001")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newCase)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
	//Delete the Trainer
	@Test
    public void BE_Delete_CaseRecord() throws Exception {
		
	 	mockMvc.perform(MockMvcRequestBuilders.delete("/Lawyer/Case Record")
		.param("CaseRecordID","CRID001")
		.contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
}
